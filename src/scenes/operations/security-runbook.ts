import type { Scene } from '@graphlearning/flow'

// §9 — two incidents handled by runbook: a leaked service key used from an unknown IP, and a
// runaway warehouse. Each step names an owner; containment comes before investigation.
export const securityRunbook: Scene = {
  id: 'security-runbook',
  title: 'Contain first, then investigate',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'security',
      kind: 'table',
      label: 'Runbook: LOADER_SVC used from an unknown IP — 9 October',
      headers: ['Step', 'Action', 'Owner'],
      values: [
        ['1 Contain', 'ALTER USER loader_svc SET DISABLED = TRUE', 'security on-call'],
        ['2 Block', 'add the IP to the network policy blocked list', 'security on-call'],
        ['3 Rotate', 'new key in RSA_PUBLIC_KEY_2, then remove the old', 'platform team'],
        ['4 Scope', 'LOGIN_HISTORY + ACCESS_HISTORY: what was read?', 'security + data owner'],
        ['5 Notify', 'per policy, if personal data was read', 'data owner + legal'],
        ['6 Learn', 'why could it connect from there at all?', 'everyone'],
      ],
    },
    {
      id: 'cost',
      kind: 'table',
      label: 'Runbook: BI_WH at 3 clusters since Friday — cost incident',
      headers: ['Step', 'Action', 'Owner'],
      values: [
        ['1 Contain', 'ALTER WAREHOUSE bi_wh SET MAX_CLUSTER_COUNT = 1', 'platform on-call'],
        ['2 Find', 'QUERY_HISTORY: a dashboard refreshing every 10 s', 'platform on-call'],
        ['3 Fix', 'owner of the dashboard changes the schedule', 'BI owner'],
        ['4 Prevent', 'resource monitor + budget alert (ch. 8)', 'platform team'],
      ],
    },
    {
      id: 'principles',
      label: 'Runbook principles',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'p-written', label: 'Written first', sub: 'not during the incident', pattern: 'user', icon: 'scroll' },
        { id: 'p-owner', label: 'Named owners', sub: 'per step, with backups', pattern: 'user', icon: 'users' },
        { id: 'p-drill', label: 'Rehearsed', sub: 'like failover', pattern: 'user', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'security', target: 'cost', label: 'same shape' },
    { source: 'cost', target: 'principles' },
  ],
}
