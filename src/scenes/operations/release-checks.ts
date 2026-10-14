import type { Scene } from '@graphlearning/flow'

// §3 — the gate between test and prod: structure, data, contract and reconciliation checks, each
// with an owner and a pass condition. A release that cannot show evidence does not ship.
export const releaseChecks: Scene = {
  id: 'release-checks',
  title: 'Evidence before promotion',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'checks',
      kind: 'table',
      label: 'Release 1.4 — checks in RETAIL_TEST',
      headers: ['Check', 'How', 'Pass condition', 'Result'],
      values: [
        ['Plan is as expected', 'DCM plan diff', 'adds REFUNDS, V2; drops nothing', 'pass'],
        ['Unit: revenue definition', 'fixed input rows', 'S-01 1 Oct = 192.40', 'pass'],
        ['Contract: v1 unchanged', 'compare v1 before / after', '0 differing rows', 'pass'],
        ['Reconcile with source', 'counts + totals (ch. 4)', 'matches manifest', 'pass'],
        ['Policies still apply', 'POLICY_CONTEXT matrix (ch. 9)', 'all roles as expected', 'pass'],
        ['Performance', 'warm median, v2 query', '≤ 2 s on BI_WH', 'pass'],
      ],
    },
    {
      id: 'contract-test',
      kind: 'code',
      filename: 'tests/v1_unchanged.sql',
      label: `-- v1 must not move while consumers still read it
SELECT COUNT(*) AS differing_rows FROM (
  (SELECT * FROM retail_test.sales.daily_revenue
   MINUS SELECT * FROM retail_test.audit.daily_revenue_before)
  UNION ALL
  (SELECT * FROM retail_test.audit.daily_revenue_before
   MINUS SELECT * FROM retail_test.sales.daily_revenue));      -- expect 0`,
    },
    {
      id: 'after-deploy',
      label: 'After deploying to prod',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'ad-smoke', label: 'Smoke test', sub: 'v1 and v2 answer', pattern: 'user', icon: 'zap' },
        { id: 'ad-runs', label: 'First runs', sub: 'tasks, DT refreshes', pattern: 'user', icon: 'history' },
        { id: 'ad-record', label: 'Release record', sub: 'commit, checks, who', pattern: 'user', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'checks', target: 'contract-test', label: 'for example' },
    { source: 'contract-test', target: 'after-deploy', label: 'then promote' },
  ],
}
