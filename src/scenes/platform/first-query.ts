import type { Scene } from '@graphlearning/flow'

// §5 — input rows, the annotated query, the result. The SHIPPED total is checkable by hand:
// 89.50 + 74.90 + 48.00 = 212.40.
export const firstQuery: Scene = {
  id: 'first-query',
  title: 'A first query, input to result',
  flow: 'TB',
  padding: 0.17,
  nodes: [
    {
      id: 'orders-input',
      kind: 'table',
      label: 'RETAIL.SALES.ORDERS',
      headers: ['ORDER_ID', 'CUSTOMER_ID', 'ORDER_DATE', 'ORDER_STATUS', 'ORDER_TOTAL'],
      values: [
        ['1001', 'C-207', '2026-10-01', 'SHIPPED', '89.50'],
        ['1002', 'C-311', '2026-10-01', 'PENDING', '58.00'],
        ['1003', 'C-207', '2026-10-01', 'SHIPPED', '74.90'],
        ['1004', 'C-150', '2026-10-01', 'CANCELLED', '19.99'],
        ['1005', 'C-388', '2026-10-01', 'SHIPPED', '48.00'],
        ['1006', 'C-311', '2026-10-02', 'SHIPPED', '120.00'],
      ],
    },
    {
      id: 'query',
      kind: 'code',
      filename: 'first_query.sql',
      label: `USE ROLE analyst;                 -- whose privileges apply to this session
USE WAREHOUSE bi_wh;              -- which compute executes (and bills) it

SELECT order_status,
       COUNT(*)         AS orders,
       SUM(order_total) AS revenue
FROM   retail.sales.orders        -- database.schema.table, no guessing
WHERE  order_date = '2026-10-01'  -- keeps 5 of 6 rows
GROUP  BY order_status            -- the grain of the result
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
