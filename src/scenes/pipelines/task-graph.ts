import type { Scene } from '@graphlearning/flow'

// §2 — the nightly graph: a root load, a clean step, two builds in parallel, and a finalizer that
// always runs. Every task in it shares one owner.
export const taskGraph: Scene = {
  id: 'task-graph',
  title: 'A graph of tasks, one owner',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'graph-row',
      label: 'The graph, and who it runs as',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'graph',
          label: 'Nightly graph — RETAIL.OPS',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'g-root', label: 'LOAD_ORDERS', sub: 'root: schedule lives here', pattern: 'service', icon: 'calendar' },
            { id: 'g-clean', label: 'CLEAN_ORDERS', sub: 'RAW → SALES, deduplicated', pattern: 'service', icon: 'funnel' },
            {
              id: 'g-parallel',
              label: 'In parallel',
              pattern: 'group',
              cols: 2,
              children: [
                { id: 'g-lines', label: 'BUILD_LINES', sub: 'FACT_ORDER_LINES', pattern: 'service', icon: 'table' },
                { id: 'g-dim', label: 'BUILD_CUSTOMER', sub: 'DIM_CUSTOMER rows', pattern: 'service', icon: 'users' },
              ],
            },
            { id: 'g-final', label: 'FINALIZE_RUN', sub: 'finalizer: always runs', pattern: 'warn', icon: 'bell' },
          ],
          edges: [
            { source: 'g-root', target: 'g-clean' },
            { source: 'g-clean', target: 'g-parallel' },
            { source: 'g-parallel', target: 'g-final' },
          ],
        },
        {
          id: 'identity',
          label: 'Who a task runs as',
          pattern: 'user',
          cols: 1,
          children: [
            { id: 'id-owner', label: 'Default', sub: 'system user, owner role\'s privileges', pattern: 'user', icon: 'key' },
            { id: 'id-user', label: 'EXECUTE AS USER', sub: 'a named user, auditable', pattern: 'user', icon: 'usercheck' },
          ],
        },
      ],
    },
    {
      id: 'graph-code',
      kind: 'code',
      filename: 'graph.sql',
      label: `CREATE TASK retail.ops.clean_orders   AFTER retail.ops.load_orders  AS ...;
CREATE TASK retail.ops.build_lines    AFTER retail.ops.clean_orders AS ...;
CREATE TASK retail.ops.build_customer AFTER retail.ops.clean_orders AS ...;
CREATE TASK retail.ops.finalize_run   FINALIZE = retail.ops.load_orders
  AS CALL retail.ops.record_run();      -- logs outcome, cleans up, even after failure`,
    },
  ],
  edges: [{ source: 'graph-row', target: 'graph-code', label: 'AFTER and FINALIZE' }],
}
