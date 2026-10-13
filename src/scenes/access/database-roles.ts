import type { Scene } from '@graphlearning/flow'

// §6 — database roles live inside RETAIL and carry its privileges; account roles are what a
// session activates. The share edge foreshadows chapter 9.
export const databaseRoles: Scene = {
  id: 'database-roles',
  title: 'Database roles travel with the database',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'db-scope',
      label: 'Database RETAIL — managed by its owner',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'sales-read', label: 'SALES_READ', sub: 'database role: SELECT on SALES', pattern: 'storage', icon: 'usercheck' },
        { id: 'raw-write', label: 'RAW_WRITE', sub: 'database role: INSERT on RAW', pattern: 'storage', icon: 'usercheck' },
      ],
    },
    {
      id: 'account-scope',
      label: 'Account roles — the only ones a session activates',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'acct-analyst', label: 'ANALYST', sub: 'gets SALES_READ', pattern: 'service', icon: 'search' },
        { id: 'acct-loader', label: 'LOADER', sub: 'gets RAW_WRITE', pattern: 'service', icon: 'package' },
        { id: 'partner-share', label: 'Share', sub: 'chapter 9', pattern: 'external', icon: 'share' },
      ],
    },
    {
      id: 'db-role-code',
      kind: 'code',
      filename: 'database_roles.sql',
      label: `CREATE DATABASE ROLE retail.sales_read;
GRANT USAGE  ON SCHEMA retail.sales            TO DATABASE ROLE retail.sales_read;
GRANT SELECT ON ALL TABLES IN SCHEMA retail.sales TO DATABASE ROLE retail.sales_read;

GRANT DATABASE ROLE retail.sales_read TO ROLE analyst;  -- also implies USAGE on RETAIL
-- USE ROLE retail.sales_read;  fails: database roles are never primary or secondary`,
    },
  ],
  edges: [
    { source: 'db-scope', target: 'account-scope', label: 'granted to' },
    { source: 'account-scope', target: 'db-role-code', label: 'built by' },
  ],
}
