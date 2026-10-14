import type { Scene } from '@graphlearning/flow'

// §8 — four table types by where the data lives and what Snowflake can do to it, plus the
// question that selects each one. Standard stays the default.
export const tableTypes: Scene = {
  id: 'table-types',
  title: 'Choosing a table type by its boundaries',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'type-matrix',
      kind: 'table',
      label: 'Where data lives and what Snowflake may do to it',
      headers: ['Type', 'Data lives in', 'Writes from Snowflake', 'Recovery'],
      values: [
        ['Standard', 'Snowflake storage', 'full DML', 'Time Travel + Fail-safe'],
        ['Iceberg', 'Iceberg files, external volume', 'full DML with Snowflake catalog', 'yours, unless Snowflake storage'],
        ['External', 'files in a stage', 'none: read-only', 'yours: the files'],
        ['Hybrid', 'row store + columnar copy', 'full DML, row locks', 'no UNDROP; PK enforced'],
      ],
    },
    {
      id: 'selection',
      label: 'Which question selects it',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'pick-standard', label: 'Standard', sub: 'analytics: the default', pattern: 'storage', icon: 'table' },
        { id: 'pick-iceberg', label: 'Iceberg', sub: 'other engines read it too', pattern: 'network', icon: 'share' },
        { id: 'pick-external', label: 'External', sub: 'query files, no load', pattern: 'external', icon: 'file' },
        { id: 'pick-hybrid', label: 'Hybrid', sub: 'one-row reads and writes', pattern: 'service', icon: 'zap' },
      ],
    },
    {
      id: 'retail-fit',
      label: 'In the retail product',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'fit-standard', label: 'SALES', sub: 'orders, summaries', pattern: 'user', icon: 'barchart' },
        { id: 'fit-iceberg', label: 'Shared lake', sub: 'data science in Spark', pattern: 'user', icon: 'layers' },
        { id: 'fit-external', label: 'Old files', sub: 'occasional audit reads', pattern: 'user', icon: 'search' },
        { id: 'fit-hybrid', label: 'Order status', sub: 'app lookups by ID', pattern: 'user', icon: 'monitor' },
      ],
    },
  ],
  edges: [
    { source: 'type-matrix', target: 'selection', label: 'boundaries decide' },
    { source: 'selection', target: 'retail-fit', label: 'applied' },
  ],
}
