import type { Scene } from '@graphlearning/flow'

// §2 — three end-to-end shapes for the same product, compared on the requirements from §1. No shape
// wins everywhere, so each input gets the one its consumers need.
export const architectureOptions: Scene = {
  id: 'architecture-options',
  title: 'Three shapes, one product',
  flow: 'TB',
  padding: 0.14,
  nodes: [
    {
      id: 'lanes',
      label: 'Alternatives for orders → revenue',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'lane-a',
          label: 'A — full rebuild',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'a-load', label: 'COPY nightly', sub: 'all new files', pattern: 'storage', icon: 'package' },
            { id: 'a-build', label: 'Rebuild', sub: 'INSERT OVERWRITE', pattern: 'service', icon: 'repeat' },
            { id: 'a-serve', label: 'Revenue', sub: 'fresh once a day', pattern: 'user', icon: 'barchart' },
          ],
          edges: [
            { source: 'a-load', target: 'a-build' },
            { source: 'a-build', target: 'a-serve' },
          ],
        },
        {
          id: 'lane-b',
          label: 'B — streams + tasks',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'b-load', label: 'Snowpipe', sub: 'files as they land', pattern: 'storage', icon: 'zap' },
            { id: 'b-build', label: 'Stream + MERGE', sub: 'task applies changes', pattern: 'service', icon: 'merge' },
            { id: 'b-serve', label: 'Revenue', sub: 'fresh per schedule', pattern: 'user', icon: 'barchart' },
          ],
          edges: [
            { source: 'b-load', target: 'b-build' },
            { source: 'b-build', target: 'b-serve' },
          ],
        },
        {
          id: 'lane-c',
          label: 'C — dynamic tables',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'c-load', label: 'Snowpipe', sub: 'files as they land', pattern: 'storage', icon: 'zap' },
            { id: 'c-build', label: 'ORDERS_CLEAN', sub: 'DOWNSTREAM lag', pattern: 'service', icon: 'funnel' },
            { id: 'c-serve', label: 'REVENUE_DT', sub: '15-minute target lag', pattern: 'user', icon: 'barchart' },
          ],
          edges: [
            { source: 'c-load', target: 'c-build' },
            { source: 'c-build', target: 'c-serve' },
          ],
        },
      ],
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Judged on the requirements',
      headers: ['', 'A rebuild', 'B streams + tasks', 'C dynamic tables'],
      values: [
        ['Freshness', 'daily', 'per schedule', 'target lag'],
        ['You own', 'one query', 'offsets + MERGE', 'the result query'],
        ['Late CDC', 'absorbed', 'custom guard', 'only as a query'],
        ['Recovery', 'rerun the day', 'rebuild (ch. 6)', 'full refresh'],
        ['Cost shape', 'full scan daily', 'per change', 'per refresh'],
      ],
    },
    {
      id: 'chosen',
      label: 'RETAILCO picks per input, not per platform',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'ch-orders', label: 'Orders: C', sub: 'finance needs 30 min', pattern: 'user', icon: 'snowflake' },
        { id: 'ch-cust', label: 'Customers: B', sub: 'SOURCE_SEQ guard', pattern: 'user', icon: 'merge' },
        { id: 'ch-ref', label: 'Reference: A', sub: 'small, rarely changes', pattern: 'user', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'lanes', target: 'compare', label: 'compared' },
    { source: 'compare', target: 'chosen', label: 'chosen' },
  ],
}
