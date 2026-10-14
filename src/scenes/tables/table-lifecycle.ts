import type { Scene } from '@graphlearning/flow'

// §3 — the three table kinds side by side, and what happens to a permanent table's data after
// it is dropped or changed: Time Travel, then Fail-safe, then gone.
export const tableLifecycle: Scene = {
  id: 'table-lifecycle',
  title: 'Permanent, transient, temporary',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Lifecycle by table kind (Enterprise edition)',
      headers: ['', 'Permanent', 'Transient', 'Temporary'],
      values: [
        ['Lives until', 'dropped', 'dropped', 'session ends'],
        ['Time Travel', '0–90 days, default 1', '0 or 1 day', '0 or 1 day'],
        ['Fail-safe', '7 days', 'none', 'none'],
        ['Visible to', 'any role with grants', 'any role with grants', 'its session only'],
        ['Retail use', 'SALES.ORDERS', 'RAW.ORDERS_BATCH', 'scratch work'],
      ],
    },
    {
      id: 'after-change',
      label: 'A permanent table\'s old data, after a change or DROP',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'phase-tt', label: 'Time Travel', sub: 'you query, clone, UNDROP', pattern: 'storage', icon: 'history' },
        { id: 'phase-fs', label: 'Fail-safe', sub: '7 days, Snowflake only', pattern: 'warn', icon: 'lock' },
        { id: 'phase-gone', label: 'Purged', sub: 'no recovery', pattern: 'warn', icon: 'trash' },
      ],
      edges: [
        { source: 'phase-tt', target: 'phase-fs', label: 'retention ends' },
        { source: 'phase-fs', target: 'phase-gone' },
      ],
    },
    {
      id: 'lifecycle-code',
      kind: 'code',
      filename: 'table_kinds.sql',
      label: `CREATE TRANSIENT TABLE retail.raw.orders_batch (...)   -- reloadable from files:
  DATA_RETENTION_TIME_IN_DAYS = 1;                     --   no Fail-safe storage to pay for

CREATE TEMPORARY TABLE orders_check AS                 -- gone when the session ends
  SELECT * FROM retail.sales.orders WHERE order_date = '2026-10-01';`,
    },
  ],
  edges: [
    { source: 'kinds', target: 'after-change', label: 'retention decides recovery' },
    { source: 'after-change', target: 'lifecycle-code', label: 'chosen at CREATE' },
  ],
}
