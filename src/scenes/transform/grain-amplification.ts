import type { Scene } from '@graphlearning/flow'

// §1 — joining an order-grain table to a line-grain table repeats each order once per line, so
// summing an order-level amount after the join inflates it. 212.40 is ch.1's SHIPPED revenue.
export const grainAmplification: Scene = {
  id: 'grain-amplification',
  title: 'A join changes the grain',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'inputs',
      label: 'Two grains, shipped orders on 1 October',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'orders-grain',
          kind: 'table',
          label: 'SALES.ORDERS — one row per order',
          headers: ['ORDER_ID', 'ORDER_TOTAL'],
          values: [
            ['1001', '89.50'],
            ['1003', '74.90'],
            ['1005', '48.00'],
          ],
        },
        {
          id: 'lines-grain',
          kind: 'table',
          label: 'SALES.ORDER_LINES — one row per line',
          headers: ['ORDER_ID', 'LINE', 'LINE_AMOUNT'],
          values: [
            ['1001', '1', '59.50'],
            ['1001', '2', '30.00'],
            ['1003', '1', '24.90'],
            ['1003', '2', '30.00'],
            ['1003', '3', '20.00'],
            ['1005', '1', '48.00'],
          ],
        },
      ],
    },
    {
      id: 'two-queries',
      label: 'Same question, two answers',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'wrong-query',
          kind: 'code',
          filename: 'amplified.sql',
          label: `SELECT SUM(o.order_total)
FROM orders o
JOIN order_lines l
  ON l.order_id = o.order_id
WHERE o.order_status = 'SHIPPED';
-- 451.70  (each order × its lines)`,
        },
        {
          id: 'right-query',
          kind: 'code',
          filename: 'at_the_right_grain.sql',
          label: `SELECT SUM(l.line_amount)
FROM orders o
JOIN order_lines l
  ON l.order_id = o.order_id
WHERE o.order_status = 'SHIPPED';
-- 212.40  (sum at the line grain)`,
        },
      ],
    },
  ],
  edges: [{ source: 'inputs', target: 'two-queries', label: 'joined on ORDER_ID' }],
}
