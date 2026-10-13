import type { Scene } from '@graphlearning/flow'

// §4 — a session carries four pieces of context; the warehouse it names does the work. Two
// warehouses read the same stored tables, which is what workload isolation means here.
export const sessionContext: Scene = {
  id: 'session-context',
  title: 'Session context and warehouse isolation',
  flow: 'TB',
  nodes: [
    {
      id: 'context-query',
      kind: 'code',
      filename: 'context.sql',
      label: `SELECT CURRENT_ROLE(),       -- ANALYST
       CURRENT_WAREHOUSE(),  -- BI_WH
       CURRENT_DATABASE(),   -- RETAIL
       CURRENT_SCHEMA();     -- SALES`,
    },
    {
      id: 'session',
      label: 'Session context',
      pattern: 'user',
      cols: 4,
      children: [
        { id: 'ctx-role', label: 'Role', sub: 'ANALYST', pattern: 'user', icon: 'usercheck' },
        { id: 'ctx-warehouse', label: 'Warehouse', sub: 'BI_WH', pattern: 'user', icon: 'cpu' },
        { id: 'ctx-database', label: 'Database', sub: 'RETAIL', pattern: 'user', icon: 'database' },
        { id: 'ctx-schema', label: 'Schema', sub: 'SALES', pattern: 'user', icon: 'folder' },
      ],
    },
    {
      id: 'warehouses',
      label: 'Virtual warehouses',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'bi-wh', label: 'BI_WH', sub: 'Small, dashboards', pattern: 'service', icon: 'cpu' },
        { id: 'load-wh', label: 'LOAD_WH', sub: 'Medium, nightly loads', pattern: 'service', icon: 'cpu' },
      ],
    },
    { id: 'shared-storage', label: 'Stored tables', sub: 'one copy, read by both', pattern: 'storage', icon: 'database' },
  ],
  edges: [
    { source: 'context-query', target: 'session', label: 'reports' },
    { source: 'session', target: 'warehouses', label: 'runs on BI_WH' },
    { source: 'bi-wh', target: 'shared-storage' },
    { source: 'load-wh', target: 'shared-storage' },
  ],
}
