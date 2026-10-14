import type { Scene } from '@graphlearning/flow'

// §5 — the change events, reduced to one per key, applied with a sequence guard and delete
// handling. Running the same batch twice changes nothing.
export const incrementalMerge: Scene = {
  id: 'incremental-merge',
  title: 'Apply changes by key, guarded by sequence',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'merge-code',
      kind: 'code',
      filename: 'apply_customer_changes.sql',
      label: `MERGE INTO retail.sales.customers t
USING (
  SELECT * FROM retail.raw.customer_changes_s
  QUALIFY ROW_NUMBER() OVER (PARTITION BY customer_id
                             ORDER BY source_seq DESC) = 1         -- latest event per key
) s
ON t.customer_id = s.customer_id
WHEN MATCHED AND s.op = 'D'
  THEN DELETE                                                      -- tombstone
WHEN MATCHED AND s.source_seq > t.source_seq
  THEN UPDATE SET city = s.city, source_seq = s.source_seq         -- never go backwards
WHEN NOT MATCHED AND s.op <> 'D'
  THEN INSERT (customer_id, city, source_seq) VALUES (s.customer_id, s.city, s.source_seq);`,
    },
    {
      id: 'merge-io',
      label: 'Before and after',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'cust-before',
          kind: 'table',
          label: 'SALES.CUSTOMERS before',
          headers: ['CUSTOMER_ID', 'CITY', 'SOURCE_SEQ'],
          values: [
            ['C-150', 'Derby', '37'],
            ['C-207', 'Hull', '64'],
            ['C-311', 'Ripon', '88'],
          ],
        },
        {
          id: 'cust-after',
          kind: 'table',
          label: 'after — and after a re-run',
          headers: ['CUSTOMER_ID', 'CITY', 'SOURCE_SEQ'],
          values: [
            ['C-150', 'Derby', '37'],
            ['C-207', 'York', '103'],
            ['C-388', 'Bath', '102'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'merge-code', target: 'merge-io', label: 'C-311 deleted, C-388 inserted' }],
}
