import type { Scene } from '@graphlearning/flow'

// §3 — one night's run where BUILD_LINES fails after CLEAN_ORDERS committed. A graph is not a
// transaction; recovery relies on each task being safe to re-run.
export const partialFailure: Scene = {
  id: 'partial-failure',
  title: 'A graph run is not a transaction',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'run',
      kind: 'table',
      label: 'Graph run, 3 October 05:30',
      headers: ['Task', 'State', 'Committed?', 'Effect'],
      values: [
        ['LOAD_ORDERS', 'SUCCEEDED', 'yes', 'RAW.ORDERS +7 rows'],
        ['CLEAN_ORDERS', 'SUCCEEDED', 'yes', 'SALES.ORDERS updated'],
        ['BUILD_LINES', 'FAILED', 'no', 'FACT_ORDER_LINES stale'],
        ['BUILD_CUSTOMER', 'SUCCEEDED', 'yes', 'DIM_CUSTOMER updated'],
        ['FINALIZE_RUN', 'SUCCEEDED', 'yes', 'run logged as failed'],
      ],
    },
    {
      id: 'retry-code',
      kind: 'code',
      filename: 'recover.sql',
      label: `EXECUTE TASK retail.ops.load_orders RETRY LAST;   -- re-runs only the failed task(s)

ALTER TASK retail.ops.load_orders SET
  TASK_AUTO_RETRY_ATTEMPTS        = 2               -- default 0: no automatic retry
  SUSPEND_TASK_AFTER_NUM_FAILURES = 10              -- the default
  OVERLAP_POLICY                  = NO_OVERLAP;     -- default: a run waits for the last`,
    },
    {
      id: 'boundaries',
      label: 'What makes recovery safe',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-each', label: 'Each task commits', sub: 'no graph-wide rollback', pattern: 'warn', icon: 'circleslash' },
        { id: 'b-idem', label: 'Idempotent steps', sub: 'MERGE with guards', pattern: 'storage', icon: 'repeat' },
        { id: 'b-overlap', label: 'No overlap', sub: 'two runs never interleave', pattern: 'storage', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'run', target: 'retry-code', label: 'then' },
    { source: 'retry-code', target: 'boundaries', label: 'safe only if' },
  ],
}
