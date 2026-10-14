import type { Scene } from '@graphlearning/flow'

// §4 — two different symptoms: one heavy query that is slow alone (scale up), and many small
// queries that wait at 09:00 (scale out). Credits are standard Gen1 rates per hour.
export const scaleUpOut: Scene = {
  id: 'scale-up-out',
  title: 'Bigger, or more of them',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'symptoms',
      label: 'Two symptoms, two remedies',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'slow-alone',
          label: 'One query slow on its own',
          pattern: 'service',
          cols: 1,
          children: [
            { id: 'sa-evidence', label: 'Evidence', sub: 'long execution, spill, no queue', pattern: 'service', icon: 'gauge' },
            { id: 'sa-fix', label: 'Scale up', sub: 'Medium → Large: 2× compute', pattern: 'service', icon: 'cpu' },
          ],
          edges: [{ source: 'sa-evidence', target: 'sa-fix' }],
        },
        {
          id: 'many-wait',
          label: '40 dashboards at 09:00',
          pattern: 'warn',
          cols: 1,
          children: [
            { id: 'mw-evidence', label: 'Evidence', sub: 'queued overload, fast execution', pattern: 'warn', icon: 'clock' },
            { id: 'mw-fix', label: 'Scale out', sub: 'multi-cluster, 1 to 3', pattern: 'warn', icon: 'boxes' },
          ],
          edges: [{ source: 'mw-evidence', target: 'mw-fix' }],
        },
      ],
    },
    {
      id: 'remedies',
      label: 'Priced, configured, isolated',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'sizes',
          kind: 'table',
          label: 'Standard (Gen1) credits per hour, while running',
          headers: ['Size', 'Credits / h', 'Retail use'],
          values: [
            ['X-Small', '1', '—'],
            ['Small', '2', 'BI_WH'],
            ['Medium', '4', 'LOAD_WH'],
            ['Large', '8', 'a scale-up step'],
            ['X-Large', '16', '—'],
          ],
        },
        {
          id: 'mc-code',
          kind: 'code',
          filename: 'bi_wh.sql',
          label: `ALTER WAREHOUSE bi_wh SET
      MIN_CLUSTER_COUNT = 1  MAX_CLUSTER_COUNT = 3   -- auto-scale: Enterprise edition
      SCALING_POLICY    = STANDARD;                  -- start clusters to avoid queuing
    -- 09:00–09:45 at 3 clusters: 3 × 2 cr/h × 0.75 h = 4.5 credits; then back to 1`,
        },
        {
          id: 'isolation',
          label: 'Workload isolation still comes first',
          pattern: 'user',
          cols: 2,
          children: [
            { id: 'iso-bi', label: 'BI_WH', sub: 'dashboards scale out', pattern: 'user', icon: 'barchart' },
            { id: 'iso-load', label: 'LOAD_WH', sub: 'loads never queue BI', pattern: 'user', icon: 'package' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'symptoms', target: 'remedies', label: 'priced by' }],
}
