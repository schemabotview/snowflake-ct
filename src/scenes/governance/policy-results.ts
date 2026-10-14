import type { Scene } from '@graphlearning/flow'

// §2 — one SELECT, three roles, three results. The row access policy runs first and decides which
// rows exist for the role; the masking policy then decides what EMAIL shows.
export const policyResults: Scene = {
  id: 'policy-results',
  title: 'The same query, three answers',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'policy-code',
      kind: 'code',
      filename: 'policies.sql',
      label: `CREATE MASKING POLICY retail.ops.mask_email AS (val VARCHAR) RETURNS VARCHAR ->
  CASE WHEN IS_ROLE_IN_SESSION('SUPPORT') THEN val
       ELSE REGEXP_REPLACE(val, '^[^@]+', '*****') END;           -- keep the domain

CREATE ROW ACCESS POLICY retail.ops.store_rows AS (store VARCHAR) RETURNS BOOLEAN ->
  IS_ROLE_IN_SESSION('ANALYST')
  OR EXISTS (SELECT 1 FROM retail.ops.store_access m             -- mapping table
             WHERE m.store_id = store AND IS_ROLE_IN_SESSION(m.role_name));

ALTER TABLE retail.sales.customers MODIFY COLUMN email SET MASKING POLICY retail.ops.mask_email;
ALTER TABLE retail.sales.customers ADD ROW ACCESS POLICY retail.ops.store_rows ON (home_store);`,
    },
    {
      id: 'by-role',
      label: 'SELECT customer_id, home_store, email FROM sales.customers',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'as-analyst',
          kind: 'table',
          label: 'as ANALYST',
          headers: ['ID', 'STORE', 'EMAIL'],
          values: [
            ['C-150', 'S-02', '*****@mail.uk'],
            ['C-207', 'S-01', '*****@mail.uk'],
            ['C-388', 'S-01', '*****@post.uk'],
          ],
        },
        {
          id: 'as-york',
          kind: 'table',
          label: 'as YORK_MGR',
          headers: ['ID', 'STORE', 'EMAIL'],
          values: [['C-150', 'S-02', '*****@mail.uk']],
        },
        {
          id: 'as-support',
          kind: 'table',
          label: 'as SUPPORT (+ ANALYST)',
          headers: ['ID', 'STORE', 'EMAIL'],
          values: [
            ['C-150', 'S-02', 'jo.dale@mail.uk'],
            ['C-207', 'S-01', 'sam.k@mail.uk'],
            ['C-388', 'S-01', 'r.lee@post.uk'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'policy-code', target: 'by-role', label: 'rows first, then masking' }],
}
