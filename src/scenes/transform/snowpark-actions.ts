import type { Scene } from '@graphlearning/flow'

// §7 — Snowpark builds a plan on the client and pushes SQL to Snowflake only on an action; which
// action you call decides whether data stays in Snowflake or travels to the client.
export const snowparkActions: Scene = {
  id: 'snowpark-actions',
  title: 'Lazy plans, explicit actions',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'py-code',
      kind: 'code',
      filename: 'shipped_daily.py',
      label: `orders  = session.table("retail.sales.orders")                 # a reference, no query
shipped = (orders.filter(col("order_status") == "SHIPPED")
                 .group_by("order_date")
                 .agg(sum_("order_total").alias("revenue")))         # still only a plan

shipped.write.save_as_table("retail.sales.shipped_daily")          # action: runs in Snowflake
n    = shipped.count()                                             # action: one number back
rows = shipped.collect()                                           # action: result rows back
pdf  = orders.to_pandas()                                          # action: whole table → memory`,
    },
    {
      id: 'movement',
      kind: 'table',
      label: 'What each call does',
      headers: ['Call', 'Sends SQL', 'Data to the client'],
      values: [
        ['filter, group_by, agg', 'no', 'none'],
        ['save_as_table', 'yes', 'none'],
        ['count', 'yes', 'one number'],
        ['collect', 'yes', 'every result row'],
        ['to_pandas', 'yes', 'every row, into memory'],
      ],
    },
    {
      id: 'sides',
      label: 'Where the work happens',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'side-client', label: 'Python client', sub: 'builds the plan', pattern: 'user', icon: 'code' },
        { id: 'side-wh', label: 'BI_WH', sub: 'runs pushed-down SQL', pattern: 'service', icon: 'cpu' },
      ],
    },
  ],
  edges: [
    { source: 'py-code', target: 'movement' },
    { source: 'movement', target: 'sides', label: 'pushdown' },
  ],
}
