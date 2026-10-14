import type { Scene } from '@graphlearning/flow'

// §6 — three ways to make a read cheaper by doing work in advance. Each trades a background,
// serverless maintenance cost (and sometimes storage) for faster queries.
export const physicalOptions: Scene = {
  id: 'physical-options',
  title: 'Pay in the background, read faster',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'options',
      kind: 'table',
      label: 'Three physical options',
      headers: ['', 'Clustering key', 'Search optimization', 'Materialized view'],
      values: [
        ['Helps', 'range filters, pruning', 'point lookups, needles', 'repeated aggregates'],
        ['Example', 'ORDER_DATE ranges', 'WHERE order_id = 1006', 'revenue by store'],
        ['Maintained by', 'serverless reclustering', 'serverless service', 'serverless refresh'],
        ['Extra storage', 'usually little', 'often ~¼ of the table', 'the stored result'],
        ['Edition', 'all', 'Enterprise+', 'Enterprise+'],
        ['Cost grows with', 'churn on the table', 'data changed', 'base-table changes'],
      ],
    },
    {
      id: 'opt-code',
      kind: 'code',
      filename: 'physical.sql',
      label: `SELECT SYSTEM$ESTIMATE_AUTOMATIC_CLUSTERING_COSTS(
  'retail.sales.orders_history', '(order_date)');          -- estimate first
ALTER TABLE retail.sales.orders_history CLUSTER BY (order_date);
SELECT SYSTEM$CLUSTERING_INFORMATION('retail.sales.orders_history');

SELECT SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COSTS('retail.sales.orders_history');
ALTER TABLE retail.sales.orders_history ADD SEARCH OPTIMIZATION ON EQUALITY(order_id);`,
    },
    {
      id: 'when',
      label: 'Before adding any of them',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'w-rewrite', label: 'Rewrite first', sub: 'free, often enough', pattern: 'user', icon: 'pencil' },
        { id: 'w-estimate', label: 'Estimate', sub: 'the SYSTEM$ functions', pattern: 'user', icon: 'sigma' },
        { id: 'w-watch', label: 'Watch the bill', sub: 'its history views', pattern: 'user', icon: 'receipt' },
      ],
    },
  ],
  edges: [
    { source: 'options', target: 'opt-code', label: 'estimate, then enable' },
    { source: 'opt-code', target: 'when' },
  ],
}
