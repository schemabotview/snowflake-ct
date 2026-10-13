import type { Scene } from '@graphlearning/flow'

// §7 — a clone shares micro-partitions at creation; each side's later changes write partitions
// that only it owns, and that it is billed for.
export const cloneStorage: Scene = {
  id: 'clone-storage',
  title: 'Zero-copy at first, independent afterwards',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'tables-row',
      label: 'Two tables, after a week',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'clone-source', label: 'ORDERS', sub: 'RETAIL.SALES, production', pattern: 'storage', icon: 'table' },
        { id: 'clone-dev', label: 'ORDERS clone', sub: 'RETAIL_DEV.SALES', pattern: 'service', icon: 'copy' },
      ],
    },
    {
      id: 'partitions',
      label: 'Micro-partitions',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'owned-source',
          label: 'Source only',
          pattern: 'storage',
          cols: 1,
          children: [
            { id: 'p3', label: 'P3', sub: 'the clone replaced it', pattern: 'storage', icon: 'box' },
            { id: 'p-new-source', label: 'P4', sub: 'new orders since', pattern: 'storage', icon: 'box' },
          ],
        },
        {
          id: 'shared',
          label: 'Shared since the clone',
          pattern: 'network',
          cols: 1,
          children: [
            { id: 'p1', label: 'P1', sub: 'unchanged', pattern: 'network', icon: 'box' },
            { id: 'p2', label: 'P2', sub: 'unchanged', pattern: 'network', icon: 'box' },
          ],
        },
        {
          id: 'owned-clone',
          label: 'Clone only',
          pattern: 'service',
          cols: 1,
          children: [{ id: 'p-new-clone', label: 'P3′', sub: 'P3 after a test UPDATE', pattern: 'service', icon: 'box' }],
        },
      ],
    },
    {
      id: 'clone-code',
      kind: 'code',
      filename: 'clone.sql',
      label: `CREATE DATABASE retail_dev CLONE retail;        -- seconds, no data copied
CREATE TABLE retail.sales.orders_copy
  CLONE retail.sales.orders COPY GRANTS;        -- a table clone has no grants without it

-- not a backup: same account, same Region, same administrators`,
    },
  ],
  edges: [
    { source: 'tables-row', target: 'partitions', label: 'both point into' },
    { source: 'partitions', target: 'clone-code', label: 'created by' },
  ],
}
