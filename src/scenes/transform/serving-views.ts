import type { Scene } from '@graphlearning/flow'

// §5 — one revenue definition served three ways: a view for analysts, a secure view for a
// partner, a materialized view where one table's aggregate is read constantly.
export const servingViews: Scene = {
  id: 'serving-views',
  title: 'One definition, three serving interfaces',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'view-code',
      kind: 'code',
      filename: 'daily_revenue.sql',
      label: `CREATE VIEW retail.sales.daily_revenue AS
SELECT order_date, store_id, SUM(order_total) AS revenue
FROM retail.sales.orders
WHERE order_status <> 'CANCELLED'          -- the business definition, in one place
GROUP BY order_date, store_id;

CREATE SECURE VIEW retail.sales.partner_revenue AS
SELECT order_date, revenue FROM retail.sales.daily_revenue WHERE store_id = 'S-02';`,
    },
    {
      id: 'view-result',
      kind: 'table',
      label: 'DAILY_REVENUE',
      headers: ['ORDER_DATE', 'STORE_ID', 'REVENUE'],
      values: [
        ['2026-10-01', 'S-01', '212.40'],
        ['2026-10-01', 'S-02', '58.00'],
        ['2026-10-02', 'S-02', '120.00'],
      ],
    },
    {
      id: 'view-kinds',
      kind: 'table',
      label: 'Choosing the interface',
      headers: ['', 'View', 'Secure view', 'Materialized view'],
      values: [
        ['Stores results', 'no', 'no', 'yes, kept current'],
        ['Definition visible', 'to roles with access', 'owner only', 'to roles with access'],
        ['Optimizer', 'full', 'some optimizations off', 'full'],
        ['Limits', 'none special', 'can be slower', 'one table, no joins'],
        ['Costs', 'query compute', 'query compute', 'storage + background compute'],
        ['Edition', 'all', 'all', 'Enterprise+'],
      ],
    },
  ],
  edges: [
    { source: 'view-code', target: 'view-result', label: 'S-01 = ch.1 shipped total' },
    { source: 'view-result', target: 'view-kinds', label: 'served as' },
  ],
}
