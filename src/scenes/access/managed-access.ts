import type { Scene } from '@graphlearning/flow'

// §7 — who may grant on objects in a standard versus a managed access schema, and a future grant
// that covers a table nobody has created yet.
export const managedAccess: Scene = {
  id: 'managed-access',
  title: 'Who decides grants, and for tables not yet created',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'schemas',
      label: 'Who may GRANT SELECT on a table in the schema',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'standard-schema',
          label: 'Standard schema RAW',
          pattern: 'warn',
          cols: 1,
          children: [
            { id: 'std-owner', label: 'Object owner', sub: 'LOADER owns RAW.ORDERS', pattern: 'warn', icon: 'package' },
            { id: 'std-grants', label: 'Grants anyone', sub: 'decisions scatter', pattern: 'warn', icon: 'share' },
          ],
          edges: [{ source: 'std-owner', target: 'std-grants' }],
        },
        {
          id: 'managed-schema',
          label: 'Managed access schema SALES',
          pattern: 'storage',
          cols: 1,
          children: [
            { id: 'mgd-owner', label: 'Schema owner', sub: 'or MANAGE GRANTS', pattern: 'storage', icon: 'lock' },
            { id: 'mgd-grants', label: 'Grants centrally', sub: 'object owners cannot', pattern: 'storage', icon: 'circlecheck' },
          ],
          edges: [{ source: 'mgd-owner', target: 'mgd-grants' }],
        },
      ],
    },
    {
      id: 'future-code',
      kind: 'code',
      filename: 'future_grants.sql',
      label: `ALTER SCHEMA retail.sales ENABLE MANAGED ACCESS;

GRANT SELECT ON ALL TABLES    IN SCHEMA retail.sales TO DATABASE ROLE retail.sales_read;  -- today
GRANT SELECT ON FUTURE TABLES IN SCHEMA retail.sales TO DATABASE ROLE retail.sales_read;  -- later

CREATE TABLE retail.sales.returns (...);   -- next month
-- SALES_READ can already SELECT it: no ticket, no forgotten grant`,
    },
  ],
  edges: [{ source: 'schemas', target: 'future-code', label: 'the schema owner sets the rules' }],
}
