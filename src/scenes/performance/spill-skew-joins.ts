import type { Scene } from '@graphlearning/flow'

// §5 — three profile shapes that mean three different problems, each with its own fix. Sizes are
// illustrative; the signatures are what the Query Profile shows.
export const spillSkewJoins: Scene = {
  id: 'spill-skew-joins',
  title: 'Three shapes of slow',
  flow: 'TB',
  padding: 0.14,
  nodes: [
    {
      id: 'shapes',
      kind: 'table',
      label: 'Reading the profile',
      headers: ['Signature in the profile', 'Problem', 'Fix to try first'],
      values: [
        ['Bytes spilled: local 4.2 GB, remote 0', 'memory pressure', 'reduce rows earlier; then scale up'],
        ['Bytes spilled: remote 38 GB', 'severe memory pressure', 'reshape the query; larger warehouse'],
        ['One worker processes 70% of rows', 'skew on a hot key', 'handle the hot key separately'],
        ['Join output 40× its inputs', 'many-to-many join', 'fix the grain (chapter 5)'],
        ['Filter after the join', 'late selectivity', 'filter before joining'],
      ],
    },
    {
      id: 'rewrite',
      label: 'Shape the work before buying compute',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'before',
          kind: 'code',
          filename: 'before.sql',
          label: `SELECT s.region, SUM(l.line_amount)
FROM order_lines_history l
JOIN orders_history o USING (order_id)
JOIN stores s USING (store_id)
WHERE o.order_date >= '2026-10-01'
GROUP BY s.region;
-- joins 3 years, then filters`,
        },
        {
          id: 'after',
          kind: 'code',
          filename: 'after.sql',
          label: `WITH oct AS (
  SELECT order_id, store_id
  FROM orders_history
  WHERE order_date >= '2026-10-01')
SELECT s.region, SUM(l.line_amount)
FROM oct JOIN order_lines_history l
  USING (order_id)
JOIN stores s USING (store_id)
GROUP BY s.region;`,
        },
      ],
    },
  ],
  edges: [{ source: 'shapes', target: 'rewrite', label: 'e.g. late selectivity' }],
}
