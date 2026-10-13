import type { Scene } from '@graphlearning/flow'

// §1 — what lives inside a database (schemas → tables, views, stages) versus what lives at the
// account level (users, roles, warehouses, integrations). RAW.ORDERS and SALES.ORDERS share a name
// on purpose: §2 resolves the wrong one.
export const objectTree: Scene = {
  id: 'object-tree',
  title: 'Account, database, schema, object',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'account',
      label: 'Account PROD',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'account-level',
          label: 'Account-level objects — no schema',
          pattern: 'network',
          cols: 4,
          children: [
            { id: 'obj-users', label: 'Users', sub: 'ANA, LOADER_SVC', pattern: 'network', icon: 'users' },
            { id: 'obj-roles', label: 'Roles', sub: 'ANALYST, LOADER', pattern: 'network', icon: 'usercheck' },
            { id: 'obj-warehouses', label: 'Warehouses', sub: 'BI_WH, LOAD_WH', pattern: 'network', icon: 'cpu' },
            { id: 'obj-integrations', label: 'Integrations', sub: 'storage, security', pattern: 'network', icon: 'plug' },
          ],
        },
        {
          id: 'db-retail',
          label: 'Database RETAIL',
          pattern: 'storage',
          cols: 3,
          children: [
            {
              id: 'schema-raw',
              label: 'Schema RAW',
              pattern: 'external',
              cols: 1,
              children: [
                { id: 'raw-orders', label: 'ORDERS', sub: 'table, as landed', pattern: 'external', icon: 'table' },
                { id: 'raw-landing', label: 'LANDING', sub: 'external stage', pattern: 'external', icon: 'folder' },
              ],
            },
            {
              id: 'schema-sales',
              label: 'Schema SALES',
              pattern: 'storage',
              cols: 1,
              children: [
                { id: 'sales-orders', label: 'ORDERS', sub: 'table, cleaned', pattern: 'storage', icon: 'table' },
                { id: 'sales-customers', label: 'CUSTOMERS', sub: 'table', pattern: 'storage', icon: 'table' },
                { id: 'sales-daily', label: 'DAILY_REVENUE', sub: 'view', pattern: 'storage', icon: 'layers' },
              ],
            },
            {
              id: 'schema-reference',
              label: 'Schema REFERENCE',
              pattern: 'service',
              cols: 1,
              children: [
                { id: 'ref-products', label: 'PRODUCTS', sub: 'table', pattern: 'service', icon: 'table' },
                { id: 'ref-stores', label: 'STORES', sub: 'table', pattern: 'service', icon: 'table' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'names',
      kind: 'code',
      filename: 'names.sql',
      label: `-- database.schema.object: one name, one object
SELECT * FROM retail.sales.orders;   -- cleaned
SELECT * FROM retail.raw.orders;     -- a different table

-- account-level objects take a bare name
USE WAREHOUSE bi_wh;
USE ROLE analyst;`,
    },
  ],
  edges: [{ source: 'account', target: 'names', label: 'how you name them' }],
}
