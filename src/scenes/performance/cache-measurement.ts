import type { Scene } from '@graphlearning/flow'

// §3 — three runs of the pruned query and why each is a different measurement. Only the third is
// a fair, repeatable comparison.
export const cacheMeasurement: Scene = {
  id: 'cache-measurement',
  title: 'Three runs, three different measurements',
  flow: 'TB',
  padding: 0.14,
  nodes: [
    {
      id: 'runs',
      kind: 'table',
      label: 'The pruned October query, run three times',
      headers: ['Run', 'Elapsed', 'Bytes scanned', 'What answered it'],
      values: [
        ['1  cold warehouse', '1.1 s', '1.6 GB', 'remote storage'],
        ['2  same text', '0.08 s', '0', 'result cache: no warehouse used'],
        ['3  cache off, warm', '0.6 s', '1.6 GB', 'warehouse local disk cache'],
      ],
    },
    {
      id: 'caches',
      label: 'Two caches, very different rules',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'result-cache',
          label: 'Result cache',
          pattern: 'service',
          cols: 1,
          children: [
            { id: 'rc-where', label: 'Cloud services', sub: 'kept 24 h, reuse extends', pattern: 'service', icon: 'history' },
            { id: 'rc-when', label: 'Reused only if', sub: 'same query, same data', pattern: 'service', icon: 'repeat' },
            { id: 'rc-max', label: 'At most 31 days', sub: 'from first run', pattern: 'service', icon: 'calendar' },
          ],
        },
        {
          id: 'wh-cache',
          label: 'Warehouse cache',
          pattern: 'storage',
          cols: 1,
          children: [
            { id: 'wc-where', label: 'Local disk', sub: 'of one warehouse', pattern: 'storage', icon: 'harddrive' },
            { id: 'wc-lost', label: 'Lost on suspend', sub: 'auto-suspend clears it', pattern: 'warn', icon: 'power' },
            { id: 'wc-shared', label: 'Not shared', sub: 'BI_WH ≠ LOAD_WH', pattern: 'storage', icon: 'circleslash' },
          ],
        },
      ],
    },
    {
      id: 'fair-code',
      kind: 'code',
      filename: 'fair_test.sql',
      label: `ALTER SESSION SET USE_CACHED_RESULT = FALSE;   -- measure work, not the result cache
-- run each variant several times on the same warehouse; compare warm medians
-- and record BYTES_SCANNED and PARTITIONS_SCANNED, not just elapsed time`,
    },
  ],
  edges: [
    { source: 'runs', target: 'caches', label: 'explained by' },
    { source: 'caches', target: 'fair-code', label: 'so measure fairly' },
  ],
}
