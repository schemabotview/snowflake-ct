import type { Scene } from '@graphlearning/flow'

// §4 — the same clean-and-aggregate as declarative dynamic tables. Only the last table has a
// clock; the one before it refreshes when the one after it needs it.
export const dynamicLag: Scene = {
  id: 'dynamic-lag',
  title: 'Declare the result and how fresh it must be',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'dt-chain',
      label: 'Dynamic table pipeline',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'dt-raw', label: 'RAW.ORDERS', sub: 'base table', pattern: 'external', icon: 'table' },
        { id: 'dt-clean', label: 'ORDERS_CLEAN', sub: 'lag DOWNSTREAM', pattern: 'service', icon: 'funnel' },
        { id: 'dt-rev', label: 'REVENUE_DT', sub: 'lag 15 minutes', pattern: 'storage', icon: 'barchart' },
        { id: 'dt-dash', label: 'Dashboard', sub: 'reads REVENUE_DT', pattern: 'user', icon: 'monitor' },
      ],
      edges: [
        { source: 'dt-raw', target: 'dt-clean' },
        { source: 'dt-clean', target: 'dt-rev' },
        { source: 'dt-rev', target: 'dt-dash' },
      ],
    },
    {
      id: 'dt-detail',
      label: 'Declared, with its rules',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'dt-code',
          kind: 'code',
          filename: 'dynamic_tables.sql',
          label: `CREATE DYNAMIC TABLE retail.mart.orders_clean
      TARGET_LAG = DOWNSTREAM            -- refresh only when a consumer needs it
      WAREHOUSE  = load_wh
    AS SELECT * FROM retail.raw.orders
       QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY source_row DESC) = 1;

    CREATE DYNAMIC TABLE retail.mart.revenue_dt
      TARGET_LAG = '15 minutes'          -- the freshness goal for the whole chain
      WAREHOUSE  = load_wh
    AS SELECT order_date, store_id, SUM(order_total) AS revenue
       FROM retail.mart.orders_clean WHERE order_status <> 'CANCELLED'
       GROUP BY order_date, store_id;`,
        },
        {
          id: 'refresh-timeline',
          kind: 'table',
          label: 'REVENUE_DT refresh history, 3 October',
          headers: ['Refresh start', 'Data as of', 'Took', 'Actual lag'],
          values: [
            ['09:00', '09:00', '1 min', '≤ 15 min'],
            ['09:12', '09:12', '2 min', '≤ 15 min'],
            ['09:24', '09:24', '19 min', '22 min — target missed'],
          ],
        },
        {
          id: 'lag-rules',
          label: 'Target lag rules',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'lr-goal', label: 'A goal', sub: 'actual lag can exceed it', pattern: 'warn', icon: 'gauge' },
            { id: 'lr-min', label: 'At least 1 min', sub: 'and ≥ every upstream lag', pattern: 'service', icon: 'clock' },
            { id: 'lr-down', label: 'DOWNSTREAM', sub: 'needs a timed table after it', pattern: 'service', icon: 'workflow' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'dt-chain', target: 'dt-detail', label: 'declared as' }],
}
