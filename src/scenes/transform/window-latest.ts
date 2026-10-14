import type { Scene } from '@graphlearning/flow'

// §2 — a window keeps every row and adds a per-customer rank and total; QUALIFY keeps the latest.
// C-207 has two orders on the same date, so the tie-break on ORDER_ID decides.
export const windowLatest: Scene = {
  id: 'window-latest',
  title: 'Rank within a group, keep every row',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'window-code',
      kind: 'code',
      filename: 'latest_order.sql',
      label: `WITH ranked AS (                                    -- a CTE names a step
  SELECT customer_id, order_id, order_date, order_total,
         ROW_NUMBER() OVER (PARTITION BY customer_id
                            ORDER BY order_date DESC,
                                     order_id   DESC) AS rn,   -- tie-break
         SUM(order_total) OVER (PARTITION BY customer_id) AS customer_total
  FROM retail.sales.orders
)
SELECT * FROM ranked
QUALIFY rn = 1;                                     -- filter on the window result`,
    },
    {
      id: 'ranked-rows',
      kind: 'table',
      label: 'ranked — every order kept, window columns added',
      headers: ['CUSTOMER_ID', 'ORDER_ID', 'ORDER_DATE', 'RN', 'CUSTOMER_TOTAL'],
      values: [
        ['C-150', '1004', '2026-10-01', '1', '19.99'],
        ['C-207', '1003', '2026-10-01', '1', '164.40'],
        ['C-207', '1001', '2026-10-01', '2', '164.40'],
        ['C-311', '1006', '2026-10-02', '1', '178.00'],
        ['C-311', '1002', '2026-10-01', '2', '178.00'],
        ['C-388', '1005', '2026-10-01', '1', '48.00'],
      ],
    },
    {
      id: 'kept',
      label: 'After QUALIFY rn = 1 — one row per customer',
      pattern: 'storage',
      cols: 4,
      children: [
        { id: 'k-150', label: 'C-150', sub: 'order 1004', pattern: 'storage', icon: 'users' },
        { id: 'k-207', label: 'C-207', sub: '1003, by tie-break', pattern: 'warn', icon: 'users' },
        { id: 'k-311', label: 'C-311', sub: 'order 1006', pattern: 'storage', icon: 'users' },
        { id: 'k-388', label: 'C-388', sub: 'order 1005', pattern: 'storage', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'window-code', target: 'ranked-rows', label: 'window: no rows collapse' },
    { source: 'ranked-rows', target: 'kept', label: 'QUALIFY' },
  ],
}
