import type { Scene } from '@graphlearning/flow'

// §1 — one Git repository, three environments, one set of definitions rendered per target. The
// environments differ by configuration, never by hand-edited SQL.
export const environments: Scene = {
  id: 'environments',
  title: 'One definition, three environments',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'repo',
      label: 'Git: retail-platform',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-defs', label: 'Definitions', sub: 'DEFINE TABLE, VIEW, …', pattern: 'service', icon: 'filecode' },
        { id: 'r-manifest', label: 'manifest.yml', sub: 'targets + variables', pattern: 'service', icon: 'file' },
        { id: 'r-tests', label: 'Tests', sub: 'run before promote', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'targets',
      kind: 'table',
      label: 'Rendered per target',
      headers: ['Target', 'Account', 'Database', 'Warehouse', 'Deployed by'],
      values: [
        ['dev', 'RETAILCO.DEV', 'RETAIL_DEV', 'XS', 'each merge'],
        ['test', 'RETAILCO.DEV', 'RETAIL_TEST', 'XS', 'release candidate'],
        ['prod', 'RETAILCO.PROD', 'RETAIL', 'M', 'approved release'],
      ],
    },
    {
      id: 'define-code',
      kind: 'code',
      filename: 'definitions/sales.sql',
      label: `DEFINE TABLE {{db}}.sales.refunds (            -- declarative: the desired state
  order_id     NUMBER(38,0) NOT NULL,
  refund_total NUMBER(10,2) NOT NULL,
  refunded_at  TIMESTAMP_NTZ
);
DEFINE VIEW {{db}}.sales.daily_revenue_v2 AS ...;   -- chapter 9's new contract`,
    },
    {
      id: 'rules',
      label: 'Rules that keep environments honest',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'ru-same', label: 'Same code', sub: 'only variables differ', pattern: 'user', icon: 'copy' },
        { id: 'ru-nohand', label: 'No hand edits', sub: 'in test or prod', pattern: 'user', icon: 'ban' },
        { id: 'ru-artefact', label: 'One artefact', sub: 'the commit that was tested', pattern: 'user', icon: 'package' },
      ],
    },
  ],
  edges: [
    { source: 'repo', target: 'targets', label: 'plan + deploy' },
    { source: 'targets', target: 'define-code', label: 'from' },
    { source: 'define-code', target: 'rules' },
  ],
}
