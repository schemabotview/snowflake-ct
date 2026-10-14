import type { Scene } from '@graphlearning/flow'

// §4 — a reload written as one transaction, broken into three commits by a CREATE in the middle.
export const transactionBoundary: Scene = {
  id: 'transaction-boundary',
  title: 'A DDL statement ends your transaction',
  flow: 'TB',
  padding: 0.14,
  nodes: [
    {
      id: 'reload-code',
      kind: 'code',
      filename: 'reload_day.sql',
      label: `BEGIN;
  DELETE FROM retail.sales.orders WHERE order_date = '2026-10-01';
  INSERT INTO retail.sales.orders SELECT ... FROM retail.raw.orders ...;
  CREATE TABLE retail.sales.reload_log (...);  -- DDL: commits DELETE + INSERT first
  INSERT INTO retail.sales.reload_log ...;     -- autocommits on its own
ROLLBACK;                                      -- nothing left to undo`,
    },
    {
      id: 'lanes',
      label: 'Intended versus executed',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'intended',
          label: 'Intended: one unit',
          pattern: 'storage',
          cols: 1,
          children: [
            { id: 'int-unit', label: 'Delete + insert + log', sub: 'all, or none', pattern: 'storage', icon: 'box' },
            { id: 'int-rollback', label: 'ROLLBACK', sub: 'restores the day', pattern: 'storage', icon: 'repeat' },
          ],
          edges: [{ source: 'int-unit', target: 'int-rollback' }],
        },
        {
          id: 'executed',
          label: 'Executed: three commits',
          pattern: 'warn',
          cols: 1,
          children: [
            { id: 'exe-commit1', label: 'Commit 1', sub: 'delete + insert', pattern: 'warn', icon: 'circlecheck' },
            { id: 'exe-commit2', label: 'Commit 2', sub: 'CREATE TABLE', pattern: 'warn', icon: 'circlecheck' },
            { id: 'exe-commit3', label: 'Commit 3', sub: 'log insert', pattern: 'warn', icon: 'circlecheck' },
          ],
          edges: [
            { source: 'exe-commit1', target: 'exe-commit2' },
            { source: 'exe-commit2', target: 'exe-commit3' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'reload-code', target: 'lanes', label: 'what actually happens' }],
}
