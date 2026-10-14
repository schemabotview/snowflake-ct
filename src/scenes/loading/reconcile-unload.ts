import type { Scene } from '@graphlearning/flow'

// §8 — counts and totals at each hop against the source's manifest, then an unload with its own
// manifest for the consumer. 410.39 = 89.50 + 58.00 + 74.90 + 19.99 + 48.00 + 120.00.
export const reconcileUnload: Scene = {
  id: 'reconcile-unload',
  title: 'Prove it arrived, then hand it on',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'recon',
      kind: 'table',
      label: 'Reconciliation for the 1–2 October delivery',
      headers: ['Hop', 'Rows', 'Distinct orders', 'Total', 'Verdict'],
      values: [
        ['Source manifest', '6', '6', '410.39', 'expected'],
        ['RAW.ORDERS', '9', '6', '632.79', 'duplicates: explained'],
        ['SALES.ORDERS', '6', '6', '410.39', 'matches ✓'],
      ],
    },
    {
      id: 'unload-code',
      kind: 'code',
      filename: 'unload.sql',
      label: `COPY INTO @retail.sales.exports/daily_revenue/2026-10-02/   -- fresh dated path
FROM (SELECT order_date, store_id, revenue FROM retail.sales.daily_revenue
      WHERE order_date BETWEEN '2026-10-01' AND '2026-10-02')
FILE_FORMAT = (TYPE = PARQUET)
MAX_FILE_SIZE = 16777216;      -- default 16 MB target; several files unless SINGLE = TRUE`,
    },
    {
      id: 'handoff',
      label: 'Handed to the consumer',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'ho-files', label: 'Parquet files', sub: 'one dated folder', pattern: 'user', icon: 'file' },
        { id: 'ho-manifest', label: 'Manifest', sub: 'rows + total', pattern: 'user', icon: 'receipt' },
        { id: 'ho-contract', label: 'Contract', sub: 'columns, types, meaning', pattern: 'user', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'recon', target: 'unload-code', label: 'only once it reconciles' },
    { source: 'unload-code', target: 'handoff' },
  ],
}
