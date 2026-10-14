import type { Scene } from '@graphlearning/flow'

// §5 — customer updates with two rows for C-207 fail a MERGE; one row per key makes it
// deterministic. The target result is checkable: C-207 takes the latest city.
export const mergeDedup: Scene = {
  id: 'merge-dedup',
  title: 'One source row per target row',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'merge-inputs',
      label: 'Before the MERGE',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'updates',
          kind: 'table',
          label: 'RAW.CUSTOMER_UPDATES',
          headers: ['CUSTOMER_ID', 'CITY', 'UPDATED_AT'],
          values: [
            ['C-207', 'Leeds', '09:00'],
            ['C-207', 'York', '11:30'],
            ['C-388', 'Bath', '10:15'],
          ],
        },
        {
          id: 'customers-before',
          kind: 'table',
          label: 'SALES.CUSTOMERS',
          headers: ['CUSTOMER_ID', 'CITY'],
          values: [
            ['C-150', 'Derby'],
            ['C-207', 'Hull'],
          ],
        },
      ],
    },
    {
      id: 'merge-code',
      kind: 'code',
      filename: 'merge_customers.sql',
      label: `MERGE INTO retail.sales.customers t
USING (
  SELECT * FROM retail.raw.customer_updates
  QUALIFY ROW_NUMBER() OVER (PARTITION BY customer_id
                             ORDER BY updated_at DESC) = 1   -- one row per key
) s
ON t.customer_id = s.customer_id
WHEN MATCHED     THEN UPDATE SET city = s.city
WHEN NOT MATCHED THEN INSERT (customer_id, city) VALUES (s.customer_id, s.city);
-- without QUALIFY: "Duplicate row detected during DML action"`,
    },
    {
      id: 'customers-after',
      kind: 'table',
      label: 'SALES.CUSTOMERS after',
      headers: ['CUSTOMER_ID', 'CITY', 'BY'],
      values: [
        ['C-150', 'Derby', 'untouched'],
        ['C-207', 'York', 'UPDATE, latest'],
        ['C-388', 'Bath', 'INSERT'],
      ],
    },
  ],
  edges: [
    { source: 'merge-inputs', target: 'merge-code', label: 'two rows match C-207' },
    { source: 'merge-code', target: 'customers-after', label: 'deterministic' },
  ],
}
