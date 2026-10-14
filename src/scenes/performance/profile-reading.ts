import type { Scene } from '@graphlearning/flow'

// §1 — one slow dashboard query on the three-year history table, read as a profile: where the time
// went before execution, and which operator dominated it. Numbers are an illustrative profile.
export const profileReading: Scene = {
  id: 'profile-reading',
  title: 'Where the 14 seconds went',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'operators',
      label: 'Query profile — operator tree',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'op-result', label: 'Result', sub: '1 row per store', pattern: 'storage', icon: 'circlecheck' },
        { id: 'op-agg', label: 'Aggregate', sub: '4% of time', pattern: 'service', icon: 'sigma' },
        { id: 'op-join', label: 'Join STORES', sub: '3% of time', pattern: 'service', icon: 'merge' },
        { id: 'op-filter', label: 'Filter', sub: 'TO_CHAR(order_date)…', pattern: 'warn', icon: 'funnel' },
        { id: 'op-scan', label: 'TableScan', sub: '89% · 18,240 of 18,240 partitions', pattern: 'warn', icon: 'table' },
      ],
      edges: [
        { source: 'op-scan', target: 'op-filter', label: '1.2 B rows' },
        { source: 'op-filter', target: 'op-join', label: '1.1 M rows' },
        { source: 'op-join', target: 'op-agg' },
        { source: 'op-agg', target: 'op-result' },
      ],
    },
    {
      id: 'profile-detail',
      label: 'Timing and evidence',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'timing',
          kind: 'table',
          label: 'QUERY_HISTORY — one row',
          headers: ['Phase', 'Time'],
          values: [
            ['Compilation', '0.3 s'],
            ['Queued (overload)', '0.0 s'],
            ['Execution', '13.9 s'],
            ['Total', '14.2 s'],
          ],
        },
        {
          id: 'stats',
          kind: 'table',
          label: 'Statistics panel',
          headers: ['Statistic', 'Value'],
          values: [
            ['Partitions scanned', '18,240'],
            ['Partitions total', '18,240'],
            ['Bytes scanned', '96 GB'],
            ['Spilled to local / remote', '0 / 0'],
            ['Percentage from cache', '0%'],
          ],
        },
        {
          id: 'history-code',
          kind: 'code',
          filename: 'find_it.sql',
          label: `SELECT query_id, warehouse_name, total_elapsed_time,
       queued_overload_time, partitions_scanned, partitions_total
FROM snowflake.account_usage.query_history
WHERE query_text ILIKE '%orders_history%'
ORDER BY total_elapsed_time DESC LIMIT 10;`,
        },
      ],
    },
  ],
  edges: [{ source: 'operators', target: 'profile-detail', label: 'the scan dominates' }],
}
