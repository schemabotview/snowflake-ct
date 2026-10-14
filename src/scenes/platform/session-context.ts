import type { Scene } from '@graphlearning/flow'

// §4 — a session carries four pieces of context; the warehouse it names does the work. Two
// warehouses read the same stored tables, which is what workload isolation means here.
export const sessionContext: Scene = {
  id: 'session-context',
  title: 'Session context and warehouse isolation',
  flow: 'TB',
  padding: 0.05,
  nodes: [
    {
      id: 'context-query',
      kind: 'code',
      filename: 'session.sql',
      label: `USE ROLE analyst;          -- privileges
USE WAREHOUSE bi_wh;       -- compute
USE SCHEMA retail.sales;   -- name resolution

SELECT COUNT(*) FROM orders;  -- = RETAIL.SALES.ORDERS

SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(),
       CURRENT_DATABASE(), CURRENT_SCHEMA();`,
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
        { id: 'bi-wh', label: 'BI_WH', sub: 'Small · dashboards · suspend 60 s', pattern: 'service', icon: 'cpu' },
        { id: 'load-wh', label: 'LOAD_WH', sub: 'Medium · nightly loads · suspend 60 s', pattern: 'service', icon: 'cpu' },
      ],
    },
    {
      id: 'shared-storage',
      label: 'Storage layer — one copy, read by both',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'tbl-orders', label: 'ORDERS', sub: 'RETAIL.SALES', pattern: 'storage', icon: 'table' },
        { id: 'tbl-customers', label: 'CUSTOMERS', sub: 'RETAIL.SALES', pattern: 'storage', icon: 'table' },
        { id: 'tbl-products', label: 'PRODUCTS', sub: 'RETAIL.REFERENCE', pattern: 'storage', icon: 'table' },
      ],
    },
  ],
  edges: [
    { source: 'context-query', target: 'session', label: 'sets and reports' },
    { source: 'session', target: 'warehouses', label: 'runs on BI_WH' },
    { source: 'bi-wh', target: 'shared-storage' },
    { source: 'load-wh', target: 'shared-storage' },
  ],
}
