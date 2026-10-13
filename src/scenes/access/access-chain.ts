import type { Scene } from '@graphlearning/flow'

// §5 — the privilege chain a SELECT needs, a role matrix for the two working roles, and the
// denied query that falls out of the matrix's one gap.
export const accessChain: Scene = {
  id: 'access-chain',
  title: 'Every link in the chain, or no query',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'chain',
      label: 'What ANALYST needs to read SALES.ORDERS',
      pattern: 'service',
      cols: 4,
      children: [
        { id: 'link-db', label: 'USAGE', sub: 'database RETAIL', pattern: 'service', icon: 'database' },
        { id: 'link-schema', label: 'USAGE', sub: 'schema SALES', pattern: 'service', icon: 'folder' },
        { id: 'link-table', label: 'SELECT', sub: 'table ORDERS', pattern: 'service', icon: 'table' },
        { id: 'link-wh', label: 'USAGE', sub: 'warehouse BI_WH', pattern: 'service', icon: 'cpu' },
      ],
    },
    {
      id: 'matrix',
      kind: 'table',
      label: 'Role matrix — granted by RETAIL_ADMIN, the owner',
      headers: ['Privilege', 'On', 'ANALYST', 'LOADER'],
      values: [
        ['USAGE', 'database RETAIL', '✓', '✓'],
        ['USAGE', 'schema SALES', '✓', '✓'],
        ['SELECT', 'SALES.ORDERS', '✓', '✓'],
        ['USAGE', 'schema RAW', '—', '✓'],
        ['SELECT, INSERT', 'RAW.ORDERS', '—', '✓'],
        ['USAGE', 'warehouse BI_WH', '✓', '—'],
        ['USAGE', 'warehouse LOAD_WH', '—', '✓'],
        ['OWNERSHIP', 'RETAIL and its schemas', '—', '—'],
      ],
    },
    {
      id: 'denied',
      kind: 'code',
      filename: 'denied.sql',
      label: `USE ROLE analyst;
SELECT COUNT(*) FROM retail.raw.orders;
-- SQL compilation error:
-- Object 'RETAIL.RAW.ORDERS' does not exist or not authorized.

SHOW GRANTS TO ROLE analyst;   -- diagnosis: no USAGE on schema RAW`,
    },
  ],
  edges: [
    { source: 'chain', target: 'matrix', label: 'one row per link' },
    { source: 'matrix', target: 'denied', label: 'no USAGE on RAW' },
  ],
}
