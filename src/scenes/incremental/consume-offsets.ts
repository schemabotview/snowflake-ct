import type { Scene } from '@graphlearning/flow'

// §3 — three attempts against the same stream: a SELECT, a MERGE that fails, a MERGE that commits.
// Only the committed one moves the offset; a second consumer needs a stream of its own.
export const consumeOffsets: Scene = {
  id: 'consume-offsets',
  title: 'Only a committed DML statement moves the offset',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'attempts',
      label: 'Three attempts at 12:10',
      pattern: 'group',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'at-select', label: 'SELECT', sub: 'reads 4 rows; offset stays', pattern: 'service', icon: 'search' },
        { id: 'at-fail', label: 'MERGE fails', sub: 'rolled back; offset stays', pattern: 'warn', icon: 'ban' },
        { id: 'at-commit', label: 'MERGE commits', sub: 'offset → 12:05', pattern: 'storage', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'at-select', target: 'at-fail', label: 'same 4 rows' },
        { source: 'at-fail', target: 'at-commit', label: 'same 4 rows' },
      ],
    },
    {
      id: 'consume-code',
      kind: 'code',
      filename: 'consume.sql',
      label: `BEGIN;                                                   -- one change set for both
  MERGE INTO retail.sales.customers ... USING retail.raw.customer_changes_s ...;
  INSERT INTO retail.sales.customer_audit
    SELECT * FROM retail.raw.customer_changes_s;           -- sees the same 4 rows
COMMIT;                                                  -- offset advances only here

CREATE STREAM retail.raw.customer_changes_audit_s        -- a second consumer gets
  ON TABLE retail.raw.customer_changes APPEND_ONLY = TRUE; --   its own offset`,
    },
    {
      id: 'consumers',
      label: 'One stream per consumer',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'cons-sales', label: 'Sales stream', sub: 'customer_changes_s → SALES.CUSTOMERS', pattern: 'service', icon: 'waves' },
        { id: 'cons-audit', label: 'Audit stream', sub: 'its own offset', pattern: 'service', icon: 'waves' },
      ],
    },
  ],
  edges: [
    { source: 'attempts', target: 'consume-code', label: 'so wrap the work' },
    { source: 'consume-code', target: 'consumers' },
  ],
}
