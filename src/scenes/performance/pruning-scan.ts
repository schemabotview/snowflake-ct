import type { Scene } from '@graphlearning/flow'

// §2 — the same question written two ways. Min/max metadata lets a plain range predicate skip
// almost every micro-partition; wrapping the column in a function defeats that.
export const pruningScan: Scene = {
  id: 'pruning-scan',
  title: 'Skip partitions before reading them',
  flow: 'TB',
  padding: 0.14,
  nodes: [
    {
      id: 'partition-metadata',
      kind: 'table',
      label: 'Micro-partition metadata for ORDER_DATE (sample)',
      headers: ['Partition', 'MIN(order_date)', 'MAX(order_date)', 'Read for Oct 2026?'],
      values: [
        ['P00001', '2023-10-01', '2023-10-02', 'no — skipped'],
        ['P11420', '2025-06-14', '2025-06-15', 'no — skipped'],
        ['P17929', '2026-10-01', '2026-10-01', 'yes'],
        ['P18240', '2026-10-31', '2026-10-31', 'yes'],
      ],
    },
    {
      id: 'two-queries',
      label: 'Same question, two predicates',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'q-wrapped',
          kind: 'code',
          filename: 'no_pruning.sql',
          label: `SELECT store_id, SUM(order_total)
FROM retail.sales.orders_history
WHERE TO_CHAR(order_date, 'YYYY-MM')
      = '2026-10'
GROUP BY store_id;
-- 18,240 of 18,240 partitions
-- 14.2 s`,
        },
        {
          id: 'q-range',
          kind: 'code',
          filename: 'pruned.sql',
          label: `SELECT store_id, SUM(order_total)
FROM retail.sales.orders_history
WHERE order_date >= '2026-10-01'
  AND order_date <  '2026-11-01'
GROUP BY store_id;
-- 312 of 18,240 partitions
-- 1.1 s`,
        },
      ],
    },
    {
      id: 'pruning-rules',
      label: 'What helps pruning',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'pr-plain', label: 'Plain predicates', sub: 'compare the column itself', pattern: 'storage', icon: 'funnel' },
        { id: 'pr-order', label: 'Load order', sub: 'dates arrive together', pattern: 'storage', icon: 'sortarrows' },
        { id: 'pr-columns', label: 'Fewer columns', sub: 'columnar: SELECT * reads all', pattern: 'storage', icon: 'layers' },
      ],
    },
  ],
  edges: [
    { source: 'partition-metadata', target: 'two-queries', label: 'min / max decide' },
    { source: 'two-queries', target: 'pruning-rules' },
  ],
}
