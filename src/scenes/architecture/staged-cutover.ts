import type { Scene } from '@graphlearning/flow'

// §3 — moving finance off the legacy warehouse in stages. Each stage has acceptance evidence and a
// rollback boundary; the boundary moves once the legacy path stops loading.
export const stagedCutover: Scene = {
  id: 'staged-cutover',
  title: 'Cut over in stages, with evidence',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'stages',
      label: 'Leaving LEGACY_DW',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'st-parallel', label: '1 Parallel run', sub: '14 days, both build', pattern: 'service', icon: 'copy' },
        { id: 'st-reconcile', label: '2 Reconcile', sub: 'every store-day', pattern: 'service', icon: 'scale' },
        { id: 'st-finance', label: '3 Finance', sub: 'dashboard switches', pattern: 'user', icon: 'monitor' },
        { id: 'st-partner', label: '4 Partner', sub: 'share replaces export', pattern: 'user', icon: 'share' },
        { id: 'st-retire', label: '5 Retire legacy', sub: 'after 30 quiet days', pattern: 'warn', icon: 'trash' },
      ],
      edges: [
        { source: 'st-parallel', target: 'st-reconcile' },
        { source: 'st-reconcile', target: 'st-finance', label: 'accepted' },
        { source: 'st-finance', target: 'st-partner' },
        { source: 'st-partner', target: 'st-retire' },
      ],
    },
    {
      id: 'evidence',
      label: 'Acceptance and rollback',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'diff-sql',
          kind: 'code',
          filename: 'reconcile.sql',
          label: `SELECT COALESCE(l.store_id, n.store_id) AS store_id,
       COALESCE(l.day, n.day) AS day, l.revenue, n.revenue
FROM legacy.daily_revenue l
FULL OUTER JOIN retail.sales.daily_revenue n
  ON n.store_id = l.store_id AND n.day = l.day
WHERE l.revenue IS NULL OR n.revenue IS NULL
   OR ABS(l.revenue - n.revenue) > 0.01;     -- expect no rows`,
        },
        {
          id: 'acceptance',
          kind: 'table',
          label: 'Acceptance evidence — illustrative',
          headers: ['Criterion', 'Threshold', 'Result'],
          values: [
            ['rows per store-day', 'equal', '14 / 14 days'],
            ['revenue per store-day', '≤ 0.01 apart', '14 / 14 days'],
            ['freshness', '≤ 30 min', '1 miss: 22 min late'],
            ['policy matrix', 'as expected', 'pass'],
          ],
        },
        {
          id: 'boundaries',
          kind: 'table',
          label: 'Where rollback stops being cheap',
          headers: ['After stage', 'Rollback', 'Cost'],
          values: [
            ['1–2', 'stop the new path', 'nothing lost'],
            ['3–4', 'point consumers back', 'legacy still loads'],
            ['5', 'no simple rollback', 'fix forward'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'stages', target: 'evidence', label: 'gated by' }],
}
