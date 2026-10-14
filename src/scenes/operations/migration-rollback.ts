import type { Scene } from '@graphlearning/flow'

// §4 — the 6 October release failed half way: the table changed, the view did not. Reverting code
// does not revert data; a pre-release clone and expand-then-contract migrations do the real work.
export const migrationRollback: Scene = {
  id: 'migration-rollback',
  title: 'Rolling back code is not restoring data',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'failed',
      kind: 'table',
      label: 'Release 1.4, 6 October 21:00 — state after the failure',
      headers: ['Step', 'Intended', 'Actual'],
      values: [
        ['rename ORDERS.ORDER_TOTAL → GROSS_TOTAL', 'done', 'done'],
        ['recreate DAILY_REVENUE on GROSS_TOTAL', 'done', 'failed: syntax'],
        ['result', 'v1.4 everywhere', 'v1 view broken: invalid identifier'],
      ],
    },
    {
      id: 'approaches',
      label: 'Two ways to change a column',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'in-place',
          label: 'Rename in place',
          pattern: 'warn',
          cols: 1,
          children: [
            { id: 'ip-1', label: 'One step', sub: 'every reader breaks at once', pattern: 'warn', icon: 'zap' },
            { id: 'ip-2', label: 'Rollback', sub: 'rename back, by hand', pattern: 'warn', icon: 'repeat' },
          ],
        },
        {
          id: 'expand-contract',
          label: 'Expand, then contract',
          pattern: 'storage',
          cols: 1,
          children: [
            { id: 'ec-1', label: 'Add GROSS_TOTAL', sub: 'keep ORDER_TOTAL', pattern: 'storage', icon: 'layers' },
            { id: 'ec-2', label: 'Move readers', sub: 'one release at a time', pattern: 'storage', icon: 'swap' },
            { id: 'ec-3', label: 'Drop old column', sub: 'only when unused', pattern: 'storage', icon: 'trash' },
          ],
          edges: [
            { source: 'ec-1', target: 'ec-2' },
            { source: 'ec-2', target: 'ec-3' },
          ],
        },
      ],
    },
    {
      id: 'safety-code',
      kind: 'code',
      filename: 'pre_release.sql',
      label: `CREATE DATABASE retail_pre_1_4 CLONE retail;     -- seconds; zero-copy (ch. 3)
-- if the release fails: compare, then restore objects from the clone
CREATE OR REPLACE VIEW retail.sales.daily_revenue
  AS SELECT * FROM retail_pre_1_4.sales.daily_revenue_def ...;
-- a clone restores STATE; any rows loaded since it was taken must be re-applied`,
    },
  ],
  edges: [
    { source: 'failed', target: 'approaches', label: 'avoid it next time' },
    { source: 'approaches', target: 'safety-code', label: 'and keep a way back' },
  ],
}
