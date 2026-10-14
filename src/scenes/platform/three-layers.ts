import type { Scene } from '@graphlearning/flow'

// §2 — the three platform layers top to bottom, with the user's side of the responsibility line
// beside them. Two warehouses in the compute layer foreshadow §4's isolation point.
export const threeLayers: Scene = {
  id: 'three-layers',
  title: 'Storage, compute, cloud services — and what stays yours',
  flow: 'TB',
  nodes: [
    {
      id: 'platform',
      label: 'Operated by Snowflake',
      pattern: 'group',
      cols: 1,
      flow: 'TB',
      children: [
        {
          id: 'services',
          label: 'Cloud services',
          pattern: 'network',
          cols: 2,
          children: [
            { id: 'auth', label: 'Authentication', sub: 'who is connecting', pattern: 'network', icon: 'fingerprint' },
            { id: 'optimizer', label: 'Optimizer', sub: 'plans each query', pattern: 'network', icon: 'workflow' },
            { id: 'metadata', label: 'Metadata', sub: 'partition statistics', pattern: 'network', icon: 'tag' },
            { id: 'access', label: 'Access control', sub: 'checks privileges', pattern: 'network', icon: 'lock' },
          ],
        },
        {
          id: 'compute',
          label: 'Compute — virtual warehouses',
          pattern: 'service',
          cols: 2,
          children: [
            { id: 'wh-load', label: 'LOAD_WH', sub: 'runs ingestion', pattern: 'service', icon: 'cpu' },
            { id: 'wh-bi', label: 'BI_WH', sub: 'runs dashboards', pattern: 'service', icon: 'cpu' },
          ],
        },
        {
          id: 'storage',
          label: 'Database storage',
          pattern: 'storage',
          cols: 2,
          children: [
            { id: 'tables', label: 'Table data', sub: 'compressed, columnar micro-partitions', pattern: 'storage', icon: 'database' },
            { id: 'history', label: 'Historical data', sub: 'Time Travel, Fail-safe', pattern: 'storage', icon: 'history' },
          ],
        },
      ],
      edges: [
        { source: 'services', target: 'compute', label: 'plans + coordinates' },
        { source: 'compute', target: 'storage', label: 'reads + writes' },
      ],
    },
    {
      id: 'yours',
      label: 'Owned by you',
      pattern: 'user',
      cols: 4,
      children: [
        { id: 'quality', label: 'Data quality', sub: 'what loads and why', pattern: 'user', icon: 'circlecheck' },
        { id: 'definitions', label: 'Business definitions', sub: 'what revenue means', pattern: 'user', icon: 'scroll' },
        { id: 'grants', label: 'Access design', sub: 'which role sees what', pattern: 'user', icon: 'usercheck' },
        { id: 'sizing', label: 'Compute choices', sub: 'size, schedule, isolation', pattern: 'user', icon: 'gauge' },
      ],
    },
  ],
  edges: [{ source: 'platform', target: 'yours', label: 'runs what you configure', dashed: true }],
}
