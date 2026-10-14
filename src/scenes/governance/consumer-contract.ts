import type { Scene } from '@graphlearning/flow'

// §6 — finance redefines revenue to net of refunds. Changing DAILY_REVENUE in place silently moves
// every consumer's numbers; a versioned interface lets each consumer move deliberately.
export const consumerContract: Scene = {
  id: 'consumer-contract',
  title: 'Change the definition, not the consumers\' numbers',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'consumers',
      label: 'Who reads DAILY_REVENUE',
      pattern: 'user',
      cols: 4,
      children: [
        { id: 'c-bi', label: 'Finance BI', sub: 'dashboards', pattern: 'user', icon: 'barchart' },
        { id: 'c-app', label: 'Store app', sub: 'via SQL API', pattern: 'user', icon: 'monitor' },
        { id: 'c-partner', label: 'York partner', sub: 'through the share', pattern: 'user', icon: 'share' },
        { id: 'c-export', label: 'Nightly export', sub: 'Parquet, ch. 4', pattern: 'user', icon: 'file' },
      ],
    },
    {
      id: 'impact',
      kind: 'table',
      label: 'Revenue for S-01 on 1 October, after a 20.00 refund on order 1003',
      headers: ['Definition', 'Revenue', 'If changed in place'],
      values: [
        ['v1: orders not cancelled', '212.40', 'what every consumer expects'],
        ['v2: net of refunds', '192.40', 'every report moves by 20.00, unannounced'],
      ],
    },
    {
      id: 'versioning-code',
      kind: 'code',
      filename: 'versioned_interface.sql',
      label: `CREATE SECURE VIEW retail.sales.daily_revenue_v2              -- new contract, new name
  COMMENT = 'Revenue net of refunds. Replaces v1 from 2026-12-01.'
AS SELECT order_date, store_id, SUM(order_total) - SUM(refund_total) AS revenue
   FROM retail.sales.orders LEFT JOIN retail.sales.refunds USING (order_id) ...;

-- v1 stays unchanged until every consumer has moved; then it is retired, with notice`,
    },
    {
      id: 'contract-terms',
      kind: 'table',
      label: 'The contract each consumer relies on',
      headers: ['Term', 'DAILY_REVENUE'],
      values: [
        ['Grain', 'one row per date and store'],
        ['Definition', 'v1: orders not cancelled'],
        ['Freshness', 'within 15 minutes (REVENUE_DT)'],
        ['Change notice', '30 days, through the data owner'],
      ],
    },
  ],
  edges: [
    { source: 'consumers', target: 'impact', label: 'a definition changes' },
    { source: 'impact', target: 'versioning-code', label: 'so version it' },
    { source: 'versioning-code', target: 'contract-terms' },
  ],
}
