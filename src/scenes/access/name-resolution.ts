import type { Scene } from '@graphlearning/flow'

// §2 — the same unqualified statement in two sessions resolves to two tables; below it, how
// quoting changes what an identifier matches. Counts follow §1: SALES.ORDERS holds the 6 cleaned
// orders, RAW.ORDERS the 9 rows as landed (3 duplicate deliveries).
export const nameResolution: Scene = {
  id: 'name-resolution',
  title: 'Same text, different object',
  flow: 'TB',
  padding: 0.13,
  nodes: [
    {
      id: 'statement',
      kind: 'code',
      filename: 'count_orders.sql',
      label: `SELECT COUNT(*) FROM orders;   -- unqualified: the session decides`,
    },
    {
      id: 'two-sessions',
      label: 'Two sessions, one statement',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'session-sales',
          label: 'Schema in use: RETAIL.SALES',
          pattern: 'storage',
          cols: 1,
          children: [
            { id: 'resolves-sales', label: 'SALES.ORDERS', sub: 'cleaned table', pattern: 'storage', icon: 'table' },
            { id: 'count-sales', label: 'COUNT = 6', sub: 'one row per order', pattern: 'storage', icon: 'circlecheck' },
          ],
          edges: [{ source: 'resolves-sales', target: 'count-sales' }],
        },
        {
          id: 'session-raw',
          label: 'Schema in use: RETAIL.RAW',
          pattern: 'warn',
          cols: 1,
          children: [
            { id: 'resolves-raw', label: 'RAW.ORDERS', sub: 'landed, with duplicates', pattern: 'warn', icon: 'table' },
            { id: 'count-raw', label: 'COUNT = 9', sub: 'no error, wrong answer', pattern: 'warn', icon: 'ban' },
          ],
          edges: [{ source: 'resolves-raw', target: 'count-raw' }],
        },
      ],
    },
    {
      id: 'case-rules',
      kind: 'table',
      label: 'Identifier case rules',
      headers: ['Written as', 'Stored / resolved as', 'Matches'],
      values: [
        ['orders', 'ORDERS', 'orders, Orders, "ORDERS"'],
        ['Orders', 'ORDERS', 'the same object'],
        ['"ORDERS"', 'ORDERS', 'the same object'],
        ['"Orders"', 'Orders', 'only "Orders", quoted'],
      ],
    },
  ],
  edges: [
    { source: 'statement', target: 'two-sessions', label: 'resolved against context' },
    { source: 'two-sessions', target: 'case-rules', label: 'then matched by case' },
  ],
}
