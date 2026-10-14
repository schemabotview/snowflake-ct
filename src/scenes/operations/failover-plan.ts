import type { Scene } from '@graphlearning/flow'

// §8 — a regional outage plan. PROD is Enterprise (ch. 1), so it can replicate databases read-only
// but cannot fail over until it moves to Business Critical. RPO comes from the schedule; RTO from
// everything outside Snowflake too.
export const failoverPlan: Scene = {
  id: 'failover-plan',
  title: 'Failover is a plan, not a setting',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'regions',
      label: 'RETAILCO across two Regions',
      pattern: 'group',
      flow: 'LR',
      cols: 2,
      children: [
        { id: 'rg-primary', label: 'PROD', sub: 'AWS US West, primary', pattern: 'storage', icon: 'database' },
        { id: 'rg-dr', label: 'PROD_DR', sub: 'AWS US East, secondary', pattern: 'service', icon: 'database' },
      ],
      edges: [{ source: 'rg-primary', target: 'rg-dr', label: 'refresh every 30 min' }],
    },
    {
      id: 'groups',
      kind: 'table',
      label: 'What each edition allows',
      headers: ['', 'Replication group', 'Failover group'],
      values: [
        ['Edition', 'Standard and above', 'Business Critical and above'],
        ['Secondary', 'read-only, always', 'can be promoted to primary'],
        ['Client Redirect', 'no', 'yes: one connection URL moves'],
        ['RETAILCO today', 'possible (Enterprise)', 'needs an edition change'],
      ],
    },
    {
      id: 'objectives',
      kind: 'table',
      label: 'Objectives and what they depend on',
      headers: ['Objective', 'Target', 'Depends on'],
      values: [
        ['RPO — data lost', '≤ 60 min', 'up to 2 × the 30-min schedule'],
        ['RTO — back in service', '≤ 2 h', 'promote, redirect, S3 + IAM in US East, BI tools'],
        ['Failback', 'planned', 'resync to US West, reverse roles, retest'],
      ],
    },
    {
      id: 'outside',
      label: 'Outside Snowflake, and easy to forget',
      pattern: 'warn',
      cols: 4,
      children: [
        { id: 'out-bucket', label: 'Landing bucket', sub: 'still in US West', pattern: 'warn', icon: 'harddrive' },
        { id: 'out-iam', label: 'IAM trust', sub: 'for the DR account', pattern: 'warn', icon: 'lock' },
        { id: 'out-airflow', label: 'Orchestrator', sub: 'points at which URL?', pattern: 'warn', icon: 'workflow' },
        { id: 'out-test', label: 'Drills', sub: 'untested = unknown', pattern: 'warn', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'regions', target: 'groups', label: 'built with' },
    { source: 'groups', target: 'objectives', label: 'measured by' },
    { source: 'objectives', target: 'outside', label: 'and depends on' },
  ],
}
