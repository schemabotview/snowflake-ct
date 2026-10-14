import type { Scene } from '@graphlearning/flow'

// §5 — where the core course stops. Four specialist surfaces, each with the retail need that would
// justify it and the constraint to check first; then the product's own improvement backlog.
export const continuation: Scene = {
  id: 'continuation',
  title: 'Where to go next',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'surfaces',
      label: 'Beyond the core course',
      pattern: 'external',
      cols: 4,
      children: [
        { id: 's-iceberg', label: 'Iceberg tables', sub: 'open format, other engines', pattern: 'external', icon: 'layers' },
        { id: 's-hybrid', label: 'Hybrid tables', sub: 'row-level transactions', pattern: 'external', icon: 'zap' },
        { id: 's-apps', label: 'Native Apps', sub: 'apps, containers (SPCS)', pattern: 'external', icon: 'box' },
        { id: 's-ai', label: 'Cortex AI', sub: 'AI functions in SQL', pattern: 'external', icon: 'brain' },
      ],
    },
    {
      id: 'triggers',
      kind: 'table',
      label: 'When RETAILCO would need it',
      headers: ['Surface', 'Retail trigger', 'Check first'],
      values: [
        ['Iceberg', 'Spark jobs read orders', 'which catalog; your storage'],
        ['Hybrid tables', 'store app edits one order', 'no streams, DTs, shares'],
        ['Native Apps', 'sell benchmarks as an app', 'versions, support, listing'],
        ['Cortex AI', 'tag complaints by reason', 'model per Region; access role'],
      ],
    },
    {
      id: 'backlog',
      kind: 'table',
      label: 'RETAILCO improvement backlog',
      headers: ['#', 'Gap', 'Why first'],
      values: [
        ['1', 'failure alert on the task graph', 'finance found 7 Oct first'],
        ['2', 'decide edition for failover', 'PROD_DR cannot take over'],
        ['3', 'drill restore and failover', 'untested = unknown'],
        ['4', 'retire LEGACY_DW', 'two sources of truth'],
      ],
    },
    {
      id: 'next',
      label: 'Beyond worked examples',
      pattern: 'user',
      cols: 4,
      children: [
        { id: 'n-build', label: 'Build it', sub: 'optional, in a trial', pattern: 'user', icon: 'terminal' },
        { id: 'n-docs', label: 'Current docs', sub: 'features change often', pattern: 'user', icon: 'search' },
        { id: 'n-operate', label: 'Operate', sub: 'deploys, incidents', pattern: 'user', icon: 'gauge' },
        { id: 'n-special', label: 'Specialise', sub: 'one surface in depth', pattern: 'user', icon: 'star' },
      ],
    },
  ],
  edges: [
    { source: 'surfaces', target: 'triggers', label: 'only if' },
    { source: 'triggers', target: 'backlog', label: 'meanwhile' },
    { source: 'backlog', target: 'next', label: 'and you' },
  ],
}
