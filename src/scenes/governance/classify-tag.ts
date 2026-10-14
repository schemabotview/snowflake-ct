import type { Scene } from '@graphlearning/flow'

// §1 — classification finds what is sensitive, tags record it and who owns it, and lineage shows
// where it flows. All three are metadata: none of them stops a query.
export const classifyTag: Scene = {
  id: 'classify-tag',
  title: 'Know what you hold, who owns it, where it flows',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'lineage',
      label: 'Lineage of EMAIL',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'ln-raw', label: 'CRM changes', sub: 'RAW.CUSTOMER_CHANGES', pattern: 'external', icon: 'database' },
        { id: 'ln-sales', label: 'CUSTOMERS', sub: 'SALES, tagged', pattern: 'storage', icon: 'table' },
        { id: 'ln-dim', label: 'DIM_CUSTOMER', sub: 'MART, copied', pattern: 'service', icon: 'users' },
        { id: 'ln-export', label: 'Export file', sub: 'outside Snowflake', pattern: 'warn', icon: 'file' },
      ],
      edges: [
        { source: 'ln-raw', target: 'ln-sales' },
        { source: 'ln-sales', target: 'ln-dim', label: 'tag follows?' },
        { source: 'ln-dim', target: 'ln-export' },
      ],
    },
    {
      id: 'found',
      label: 'Found, then recorded',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'classified',
          kind: 'table',
          label: 'SALES.CUSTOMERS — classification result',
          headers: ['Column', 'SEMANTIC_CATEGORY', 'PRIVACY_CATEGORY'],
          values: [
            ['CUSTOMER_ID', '—', '—'],
            ['FULL_NAME', 'NAME', 'IDENTIFIER'],
            ['EMAIL', 'EMAIL', 'IDENTIFIER'],
            ['POSTCODE', 'POSTAL_CODE', 'QUASI_IDENTIFIER'],
            ['CITY', 'CITY', 'QUASI_IDENTIFIER'],
            ['DATE_OF_BIRTH', 'DATE_OF_BIRTH', 'QUASI_IDENTIFIER'],
          ],
        },
        {
          id: 'tag-code',
          kind: 'code',
          filename: 'classify_and_tag.sql',
          label: `-- classify, and write the result as system tags
CALL SYSTEM$CLASSIFY('retail.sales.customers',
                     {'auto_tag': true});

-- record who decides about the data
CREATE TAG retail.ops.data_owner
  ALLOWED_VALUES 'crm-team', 'sales-ops';
ALTER TABLE retail.sales.customers
  SET TAG retail.ops.data_owner = 'crm-team';

-- read back what is tagged
SELECT * FROM TABLE(
  retail.information_schema.tag_references(
    'retail.sales.customers.email', 'column'));`,
        },
      ],
    },
  ],
  edges: [{ source: 'lineage', target: 'found', label: 'every hop needs protecting' }],
}
