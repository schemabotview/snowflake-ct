import type { Scene } from '@graphlearning/flow'

// §8 — what each control can see and what it can do. Resource monitors stop warehouses; budgets
// see serverless spend but only notify; tags make attribution possible.
export const costControls: Scene = {
  id: 'cost-controls',
  title: 'Which control sees which credits',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'coverage',
      kind: 'table',
      label: 'Coverage',
      headers: ['', 'Resource monitor', 'Budget'],
      values: [
        ['Warehouses', 'yes (+ their cloud services)', 'yes'],
        ['Serverless: tasks, clustering, pipes', 'no', 'yes'],
        ['Can suspend', 'yes: warehouses', 'no: notify, or call a procedure'],
        ['Period', 'you choose', 'calendar month'],
        ['Reacts', 'within its checks', 'projected overrun; actions can lag hours'],
      ],
    },
    {
      id: 'controls-code',
      kind: 'code',
      filename: 'controls.sql',
      label: `CREATE RESOURCE MONITOR bi_monthly WITH CREDIT_QUOTA = 400
  TRIGGERS ON 80 PERCENT DO NOTIFY
           ON 100 PERCENT DO SUSPEND;             -- finish running queries, then stop
ALTER WAREHOUSE bi_wh SET RESOURCE_MONITOR = bi_monthly;

-- attribution: tag objects, then group spend by tag
ALTER WAREHOUSE load_wh SET TAG retail.ops.cost_center = 'data-eng';
ALTER TABLE retail.sales.orders_history SET TAG retail.ops.cost_center = 'analytics';`,
    },
    {
      id: 'gaps',
      label: 'Coverage limits to remember',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'g-serverless', label: 'Monitor blind spot', sub: 'serverless spend', pattern: 'warn', icon: 'circleslash' },
        { id: 'g-budget', label: 'Budget lag', sub: 'alerts, not brakes', pattern: 'warn', icon: 'clock' },
        { id: 'g-latency', label: 'View latency', sub: 'ACCOUNT_USAGE runs hours behind', pattern: 'warn', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'coverage', target: 'controls-code', label: 'set up as' },
    { source: 'controls-code', target: 'gaps' },
  ],
}
