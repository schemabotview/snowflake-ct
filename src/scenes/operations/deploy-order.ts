import type { Scene } from '@graphlearning/flow'

// §2 — the 6 October release in dependency order, run by a dedicated deployment identity whose
// grants are part of the release, not done by hand afterwards.
export const deployOrder: Scene = {
  id: 'deploy-order',
  title: 'Who deploys, and in what order',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'order',
      label: 'Release 1.4 — dependency order',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'o-roles', label: '1  Roles, grants', sub: 'what the release needs', pattern: 'network', icon: 'key' },
        { id: 'o-tables', label: '2  Tables', sub: 'SALES.REFUNDS', pattern: 'storage', icon: 'table' },
        { id: 'o-views', label: '3  Views', sub: 'DAILY_REVENUE_V2', pattern: 'storage', icon: 'layers' },
        { id: 'o-pipes', label: '4  Pipelines', sub: 'tasks, dynamic tables', pattern: 'service', icon: 'workflow' },
        { id: 'o-shares', label: '5  Shares', sub: 'expose v2 to partners', pattern: 'user', icon: 'share' },
      ],
      edges: [
        { source: 'o-roles', target: 'o-tables' },
        { source: 'o-tables', target: 'o-views' },
        { source: 'o-views', target: 'o-pipes' },
        { source: 'o-pipes', target: 'o-shares' },
      ],
    },
    {
      id: 'identity',
      label: 'The deployment identity',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'deploy-code',
          kind: 'code',
          filename: 'deployer.sql',
          label: `CREATE USER deploy_svc TYPE = SERVICE      -- chapter 2: no password
  DEFAULT_ROLE = retail_deployer;
CREATE ROLE retail_deployer;
GRANT ROLE retail_admin TO ROLE retail_deployer;  -- owns RETAIL's objects
GRANT ROLE retail_deployer TO USER deploy_svc;

-- CI, as deploy_svc: plan the DCM project,
-- review the diff, then deploy it`,
        },
        {
          id: 'deploy-rules',
          kind: 'table',
          label: 'Why a dedicated identity',
          headers: ['Practice', 'Prevents'],
          values: [
            ['objects owned by RETAIL_ADMIN, not a person', 'orphaned ownership'],
            ['grants declared in the release', 'hand-made, forgotten grants'],
            ['plan reviewed before deploy', 'surprise drops'],
            ['no human holds the role day to day', 'untracked changes'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'order', target: 'identity', label: 'run by' }],
}
