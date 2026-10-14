import type { Scene } from '@graphlearning/flow'

// §6 — three ways to keep a result current, compared on what each can express and what each
// leaves to you, then the retail product's choices.
export const chooseAutomation: Scene = {
  id: 'choose-automation',
  title: 'Dynamic tables, streams and tasks, materialized views',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Keeping a result current',
      headers: ['', 'Dynamic table', 'Stream + task', 'Materialized view'],
      values: [
        ['You write', 'the result query', 'the change logic', 'the result query'],
        ['Joins', 'yes', 'yes', 'no: one table'],
        ['Freshness', 'target lag', 'schedule or trigger', 'kept current'],
        ['Side effects, procedures', 'no', 'yes', 'no'],
        ['Custom apply rules', 'only as a query', 'any: guards, deletes', 'no'],
        ['Runs on', 'your warehouse', 'warehouse or serverless', 'serverless'],
      ],
    },
    {
      id: 'dt-alternative',
      kind: 'code',
      filename: 'customers_as_dynamic_table.sql',
      label: `-- chapter 6's apply rule, expressed as a query instead of a MERGE
CREATE DYNAMIC TABLE retail.mart.customers_current
  TARGET_LAG = '5 minutes'  WAREHOUSE = load_wh
AS SELECT customer_id, city, source_seq
   FROM retail.raw.customer_changes
   QUALIFY ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY source_seq DESC) = 1
       AND op <> 'D';                      -- latest event wins, tombstones drop out`,
    },
    {
      id: 'retail-choices',
      label: 'The retail product\'s choices',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'rc-revenue', label: 'Revenue', sub: 'dynamic table, 15 min', pattern: 'user', icon: 'barchart' },
        { id: 'rc-customers', label: 'Customers', sub: 'stream + task: guarded MERGE', pattern: 'user', icon: 'users' },
        { id: 'rc-reload', label: 'Day reload', sub: 'task calls a procedure', pattern: 'user', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'dt-alternative', label: 'a rule as a query' },
    { source: 'dt-alternative', target: 'retail-choices', label: 'applied' },
  ],
}
