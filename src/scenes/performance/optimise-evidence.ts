import type { Scene } from '@graphlearning/flow'

// §9 — the clustering change judged on measured evidence. It wins on latency and loses on credits:
// 200 runs/day: 14.2 s → 1.1 s is 0.79 h → 0.06 h of BI_WH Small (2 cr/h), 1.6 → 0.1 credits/day,
// against ~6 credits/day of reclustering. Illustrative figures; the method is the point.
export const optimiseEvidence: Scene = {
  id: 'optimise-evidence',
  title: 'A faster query is not always a cheaper system',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'loop',
      label: 'The loop',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'l-baseline', label: 'Baseline', sub: 'warm medians', pattern: 'service', icon: 'ruler' },
        { id: 'l-hypothesis', label: 'Hypothesis', sub: 'one cause', pattern: 'service', icon: 'search' },
        { id: 'l-change', label: 'One change', sub: 'in DEV clone', pattern: 'service', icon: 'wrench' },
        { id: 'l-compare', label: 'Compare', sub: 'time and credits', pattern: 'service', icon: 'scale' },
        { id: 'l-watch', label: 'Watch', sub: 'regressions', pattern: 'service', icon: 'bell' },
      ],
      edges: [
        { source: 'l-baseline', target: 'l-hypothesis' },
        { source: 'l-hypothesis', target: 'l-change' },
        { source: 'l-change', target: 'l-compare' },
        { source: 'l-compare', target: 'l-watch' },
      ],
    },
    {
      id: 'judged',
      label: 'Judged on time and credits',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'comparison',
          kind: 'table',
          label: 'CLUSTER BY (order_date) — before and after',
          headers: ['Measure', 'Before', 'After', 'Verdict'],
          values: [
            ['Warm median latency', '14.2 s', '1.1 s', '13× faster'],
            ['Partitions scanned', '18,240', '312', 'pruning works'],
            ['BI_WH credits / day (200 runs)', '1.6', '0.1', '−1.5'],
            ['Reclustering credits / day', '0', '6.0', '+6.0'],
            ['Net credits / day', '1.6', '6.1', '≈ 4× the cost'],
          ],
        },
        {
          id: 'decision',
          label: 'The decision',
          pattern: 'user',
          cols: 1,
          children: [
            { id: 'd-first', label: 'Try the rewrite', sub: 'pruned.sql: free, same 1.1 s', pattern: 'storage', icon: 'pencil' },
            { id: 'd-cluster', label: 'Cluster only if', sub: 'latency is worth 4.5 cr/day', pattern: 'user', icon: 'scale' },
            { id: 'd-record', label: 'Record it', sub: 'decision + numbers, ch. 11', pattern: 'user', icon: 'scroll' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'loop', target: 'judged', label: 'applied to clustering' }],
}
