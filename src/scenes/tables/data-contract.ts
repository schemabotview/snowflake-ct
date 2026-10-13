import type { Scene } from '@graphlearning/flow'

// §1 — SALES.ORDERS as a schema, the promises each column makes, and a type rejecting bad input
// at the door instead of in a SUM a week later.
export const dataContract: Scene = {
  id: 'data-contract',
  title: 'A table is a promise about its rows',
  flow: 'TB',
  padding: 0.16,
  nodes: [
    {
      id: 'contract-row',
      label: 'RETAIL.SALES.ORDERS',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'orders-schema',
          kind: 'table',
          label: 'Columns and types',
          columns: [
            { name: 'ORDER_ID', type: 'NUMBER(38,0)', key: 'PK' },
            { name: 'CUSTOMER_ID', type: 'VARCHAR(16)', key: 'FK' },
            { name: 'ORDER_DATE', type: 'DATE' },
            { name: 'ORDER_STATUS', type: 'VARCHAR(16)' },
            { name: 'ORDER_TOTAL', type: 'NUMBER(10,2)' },
            { name: 'UPDATED_AT', type: 'TIMESTAMP_NTZ' },
          ],
        },
        {
          id: 'promises',
          kind: 'table',
          label: 'The contract, column by column',
          headers: ['Column', 'Promise', 'Kept by'],
          values: [
            ['ORDER_ID', 'present, one row each', 'NOT NULL + your pipeline'],
            ['ORDER_DATE', 'a real date', 'the DATE type'],
            ['ORDER_STATUS', 'one of four values', 'CHECK (§2)'],
            ['ORDER_TOTAL', 'money, 2 decimals', 'NUMBER(10,2)'],
            ['UPDATED_AT', 'when it last changed', 'the source system'],
          ],
        },
      ],
    },
    {
      id: 'type-guard',
      kind: 'code',
      filename: 'type_guard.sql',
      label: `INSERT INTO retail.sales.orders (order_id, order_date, order_total)
VALUES (1007, '2026-10-02', 'N/A');
-- Numeric value 'N/A' is not recognized          ← rejected at the door

-- the same value in a VARCHAR column loads fine,
-- and breaks SUM(order_total) next week instead`,
    },
  ],
  edges: [{ source: 'contract-row', target: 'type-guard', label: 'types enforce the shape' }],
}
