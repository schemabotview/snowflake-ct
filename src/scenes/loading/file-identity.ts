import type { Scene } from '@graphlearning/flow'

// §4 — load metadata stops a re-run from loading the same file twice; it cannot stop a resent
// file with a new name. This is where RAW.ORDERS's three duplicate rows came from.
export const fileIdentity: Scene = {
  id: 'file-identity',
  title: 'Files are deduplicated, orders are not',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'timeline',
      label: '2 October, three COPY runs on the same folder',
      pattern: 'group',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'run-1', label: '06:00 COPY', sub: 'orders_20261001.csv: 6 rows', pattern: 'storage', icon: 'package' },
        { id: 'run-2', label: '06:30 retry', sub: 'same file: skipped, 0 rows', pattern: 'storage', icon: 'repeat' },
        { id: 'run-3', label: '09:00 COPY', sub: 'orders_resend.csv: 3 rows', pattern: 'warn', icon: 'copy' },
      ],
      edges: [
        { source: 'run-1', target: 'run-2' },
        { source: 'run-2', target: 'run-3' },
      ],
    },
    {
      id: 'history',
      kind: 'table',
      label: 'COPY_HISTORY for RAW.ORDERS',
      headers: ['FILE_NAME', 'STATUS', 'ROW_COUNT', 'LAST_LOAD_TIME'],
      values: [
        ['orders_20261001.csv', 'Loaded', '6', '06:00'],
        ['orders_resend.csv', 'Loaded', '3', '09:00'],
      ],
    },
    {
      id: 'boundaries',
      label: 'What load metadata does and does not know',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'knows', label: 'Knows files', sub: 'per table, 64 days', pattern: 'storage', icon: 'file' },
        { id: 'not-knows', label: 'Not orders', sub: '1001–1003 now twice', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'dup-check',
      kind: 'code',
      filename: 'business_key.sql',
      label: `SELECT order_id, COUNT(*) AS copies, ARRAY_AGG(source_file) AS files
FROM retail.raw.orders GROUP BY order_id HAVING COUNT(*) > 1;
-- 1001 | 2 | ["orders_20261001.csv","orders_resend.csv"]   … 1002, 1003

-- FORCE = TRUE reloads files it already loaded: duplicates on purpose`,
    },
  ],
  edges: [
    { source: 'timeline', target: 'history', label: 'recorded as' },
    { source: 'history', target: 'boundaries' },
    { source: 'boundaries', target: 'dup-check', label: 'so check the key' },
  ],
}
