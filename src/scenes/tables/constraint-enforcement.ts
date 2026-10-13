import type { Scene } from '@graphlearning/flow'

// §2 — which declared constraints a standard table enforces, against a hybrid table; then a
// duplicate primary key that loads without complaint and the query that finds it.
export const constraintEnforcement: Scene = {
  id: 'constraint-enforcement',
  title: 'Declared is not the same as enforced',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'enforcement',
      kind: 'table',
      label: 'What Snowflake enforces',
      headers: ['Constraint', 'Standard table', 'Hybrid table'],
      values: [
        ['NOT NULL', 'enforced', 'enforced'],
        ['CHECK', 'enforced', 'enforced'],
        ['PRIMARY KEY', 'informational', 'enforced, required'],
        ['UNIQUE', 'informational', 'enforced'],
        ['FOREIGN KEY', 'informational', 'enforced'],
      ],
    },
    {
      id: 'outcomes',
      label: 'Two inserts into a standard table',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'dup-loads', label: 'Duplicate 1001', sub: 'PRIMARY KEY: loads silently', pattern: 'warn', icon: 'copy' },
        { id: 'check-fails', label: 'Total of -5.00', sub: 'CHECK: statement fails', pattern: 'storage', icon: 'ban' },
      ],
    },
    {
      id: 'constraint-code',
      kind: 'code',
      filename: 'constraints.sql',
      label: `ALTER TABLE retail.sales.orders ADD PRIMARY KEY (order_id) RELY;  -- RELY: "trust me"
ALTER TABLE retail.sales.orders ADD CONSTRAINT total_not_negative
  CHECK (order_total >= 0);

-- the duplicate is yours to find:
SELECT order_id, COUNT(*) FROM retail.sales.orders
GROUP BY order_id HAVING COUNT(*) > 1;            -- 1001 | 2`,
    },
  ],
  edges: [
    { source: 'enforcement', target: 'outcomes', label: 'so on a standard table' },
    { source: 'outcomes', target: 'constraint-code', label: 'declared and checked' },
  ],
}
