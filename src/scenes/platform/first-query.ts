import type { Scene } from '@graphlearning/flow'

// §5 — input rows, the annotated query, the result. The SHIPPED total is checkable by hand:
// 89.50 + 74.90 + 48.00 = 212.40.
export const firstQuery: Scene = {
  id: 'first-query',
  title: 'A first query, input to result',
  flow: 'TB',
  nodes: [
    {
      id: 'orders-input',
      kind: 'table',
      label: 'RETAIL.SALES.ORDERS',
      headers: ['ORDER_ID', 'ORDER_DATE', 'ORDER_STATUS', 'ORDER_TOTAL'],
      values: [
        ['1001', '2026-10-01', 'SHIPPED', '89.50'],
        ['1002', '2026-10-01', 'PENDING', '58.00'],
        ['1003', '2026-10-01', 'SHIPPED', '74.90'],
        ['1004', '2026-10-01', 'CANCELLED', '19.99'],
        ['1005', '2026-10-01', 'SHIPPED', '48.00'],
        ['1006', '2026-10-02', 'SHIPPED', '120.00'],
      ],
    },
    {
      id: 'query',
      kind: 'code',
      filename: 'first_query.sql',
      label: `USE ROLE analyst;            -- whose privileges apply
USE WAREHOUSE bi_wh;         -- which compute runs it

SELECT order_status,
       COUNT(*)         AS orders,
       SUM(order_total) AS revenue
FROM   retail.sales.orders   -- fully qualified name
WHERE  order_date = '2026-10-01'
GROUP  BY order_status
ORDER  BY revenue DESC;`,
    },
    {
      id: 'result',
      kind: 'table',
      label: 'Result: one row per status',
      headers: ['ORDER_STATUS', 'ORDERS', 'REVENUE'],
      values: [
        ['SHIPPED', '3', '212.40'],
        ['PENDING', '1', '58.00'],
        ['CANCELLED', '1', '19.99'],
      ],
    },
  ],
  edges: [
    { source: 'orders-input', target: 'query', label: 'filter: 5 of 6 rows' },
    { source: 'query', target: 'result', label: 'group by status' },
  ],
}
