import type { Scene } from '@graphlearning/flow'

// §7 — what to do when incremental processing goes wrong. The landed event log is what makes
// replay possible; the stream alone could not.
export const recoveryDecisions: Scene = {
  id: 'recovery-decisions',
  title: 'Replay, rebuild or resume',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'decisions',
      kind: 'table',
      label: 'Situation → decision',
      headers: ['Situation', 'Decision', 'Needs'],
      values: [
        ['Stream is stale', 'recreate stream, rebuild target', 'the full event log'],
        ['MERGE logic was wrong for a week', 'replay the week into a rebuild', 'events + source sequence'],
        ['One failed run', 'just re-run: offset never moved', 'nothing extra'],
        ['Source resent old events', 'nothing: sequence guard ignores them', 'SOURCE_SEQ on target'],
      ],
    },
    {
      id: 'rebuild-code',
      kind: 'code',
      filename: 'rebuild_customers.sql',
      label: `CREATE OR REPLACE STREAM retail.raw.customer_changes_s       -- fresh offset: now
  ON TABLE retail.raw.customer_changes APPEND_ONLY = TRUE;

CREATE TABLE retail.sales.customers_rebuilt AS             -- state from the whole log
SELECT customer_id, city, source_seq
FROM retail.raw.customer_changes
QUALIFY ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY source_seq DESC) = 1
    AND op <> 'D';

-- reconcile counts and a sample, then swap
ALTER TABLE retail.sales.customers SWAP WITH retail.sales.customers_rebuilt;`,
    },
    {
      id: 'principle',
      label: 'The principle',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'pr-log', label: 'Keep the log', sub: 'events are the archive', pattern: 'user', icon: 'scroll' },
        { id: 'pr-stream', label: 'Stream = cursor', sub: 'never the archive', pattern: 'user', icon: 'waves' },
        { id: 'pr-idempotent', label: 'Idempotent apply', sub: 're-runs are safe', pattern: 'user', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'decisions', target: 'rebuild-code', label: 'rebuild from the log' },
    { source: 'rebuild-code', target: 'principle' },
  ],
}
