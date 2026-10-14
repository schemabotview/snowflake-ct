import type { Scene } from '@graphlearning/flow'

// §7 — policies are code, so they get tests: simulate each role, check every expected outcome,
// and find every object a policy change will touch before making it.
export const policyTesting: Scene = {
  id: 'policy-testing',
  title: 'Test policies as every role, before changing them',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'test-code',
      kind: 'code',
      filename: 'policy_tests.sql',
      label: `EXECUTE USING POLICY_CONTEXT(CURRENT_ROLE => 'YORK_MGR')
  AS SELECT COUNT(*) AS rows_seen, COUNT_IF(email LIKE '*****%') AS masked
     FROM retail.sales.customers;                              -- 1 row, 1 masked

SELECT ref_entity_name, ref_column_name, policy_kind           -- blast radius
FROM TABLE(retail.information_schema.policy_references(
  POLICY_NAME => 'retail.ops.mask_email'));`,
    },
    {
      id: 'test-matrix',
      kind: 'table',
      label: 'Expected outcomes — checked on every policy change',
      headers: ['Role', 'Rows', 'EMAIL', 'Result'],
      values: [
        ['ANALYST', 'all stores', 'masked', 'pass'],
        ['YORK_MGR', 'S-02 only', 'masked', 'pass'],
        ['LEEDS_MGR', 'S-01 only', 'masked', 'pass'],
        ['SUPPORT + ANALYST', 'all stores', 'clear', 'pass'],
        ['PUBLIC', 'none', '—', 'pass'],
      ],
    },
    {
      id: 'tradeoffs',
      label: 'Trade-offs to decide, not discover',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'to-perf', label: 'Cost', sub: 'policy lookups run on every query', pattern: 'warn', icon: 'gauge' },
        { id: 'to-admin', label: 'Who may change', sub: 'APPLY privilege, separate from owners', pattern: 'service', icon: 'key' },
        { id: 'to-impact', label: 'Change impact', sub: 'shares and views inherit it', pattern: 'warn', icon: 'share' },
      ],
    },
  ],
  edges: [
    { source: 'test-code', target: 'test-matrix', label: 'one query per role' },
    { source: 'test-matrix', target: 'tradeoffs' },
  ],
}
