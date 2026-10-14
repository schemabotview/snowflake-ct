import type { Scene } from '@graphlearning/flow'

// §1 — two tasks: one on a clock (the nightly load) and one triggered by ch.6's stream (the
// customer apply). Both start suspended, and both need privileges before they can run.
export const taskAnatomy: Scene = {
  id: 'task-anatomy',
  title: 'A task is one statement, plus when and on what',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'two-tasks',
      label: 'Two ways to start a task',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'scheduled', label: 'Nightly load', sub: 'CRON 05:30, on LOAD_WH', pattern: 'service', icon: 'calendar' },
        { id: 'triggered', label: 'Customer apply', sub: 'stream-triggered, serverless', pattern: 'service', icon: 'zap' },
      ],
    },
    {
      id: 'task-code',
      kind: 'code',
      filename: 'tasks.sql',
      label: `CREATE TASK retail.ops.load_orders
  WAREHOUSE = load_wh                                   -- user-managed compute
  SCHEDULE  = 'USING CRON 30 5 * * * Europe/London'
AS COPY INTO retail.raw.orders FROM @retail.raw.landing ...;

CREATE TASK retail.ops.apply_customers
  TARGET_COMPLETION_INTERVAL = '5 MINUTES'               -- serverless: no WAREHOUSE
  WHEN SYSTEM$STREAM_HAS_DATA('retail.raw.customer_changes_s')   -- triggered
AS MERGE INTO retail.sales.customers ...;               -- chapter 6's guarded MERGE

ALTER TASK retail.ops.load_orders RESUME;               -- tasks are created suspended`,
    },
    {
      id: 'prereqs',
      kind: 'table',
      label: 'Before a task can run',
      headers: ['Needed', 'Held by', 'Why'],
      values: [
        ['EXECUTE TASK', 'owner role (granted by ACCOUNTADMIN)', 'to run any task at all'],
        ['EXECUTE MANAGED TASK', 'owner role', 'for serverless tasks'],
        ['USAGE on LOAD_WH', 'owner role', 'for warehouse tasks'],
        ['privileges in the SQL', 'owner role', 'it runs with the owner\'s rights'],
      ],
    },
  ],
  edges: [
    { source: 'two-tasks', target: 'task-code', label: 'defined as' },
    { source: 'task-code', target: 'prereqs', label: 'checked on RESUME' },
  ],
}
