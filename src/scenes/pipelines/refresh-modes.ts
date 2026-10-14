import type { Scene } from '@graphlearning/flow'

// §5 — how a dynamic table decides between incremental and full refresh, when it fills for the
// first time, and which changes force it to start again.
export const refreshModes: Scene = {
  id: 'refresh-modes',
  title: 'Incremental or full, decided once',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'modes',
      kind: 'table',
      label: 'REFRESH_MODE at CREATE',
      headers: ['Mode', 'If the query supports incremental', 'If it does not'],
      values: [
        ['INCREMENTAL', 'processes only changed rows', 'CREATE fails'],
        ['AUTO', 'resolves to INCREMENTAL, fixed', 'resolves to FULL, fixed'],
        ['FULL', 'recomputes everything each refresh', 'recomputes everything'],
      ],
    },
    {
      id: 'blockers',
      label: 'Examples that force FULL',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'bk-random', label: 'RANDOM()', sub: 'non-deterministic', pattern: 'warn', icon: 'circleslash' },
        { id: 'bk-cube', label: 'ROLLUP, CUBE', sub: 'grouping sets', pattern: 'warn', icon: 'circleslash' },
        { id: 'bk-except', label: 'EXCEPT', sub: 'and INTERSECT', pattern: 'warn', icon: 'circleslash' },
        { id: 'bk-recursive', label: 'Recursive CTE', sub: 'WITH RECURSIVE', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'lifecycle',
      kind: 'table',
      label: 'First fill, and starting over',
      headers: ['Action', 'Effect'],
      values: [
        ['INITIALIZE = ON_CREATE', 'filled during CREATE'],
        ['INITIALIZE = ON_SCHEDULE', 'empty, "not initialized", until first refresh'],
        ['ALTER … SET TARGET_LAG / WAREHOUSE', 'no reinitialization'],
        ['CREATE OR REPLACE', 'always reinitializes, even if unchanged'],
      ],
    },
  ],
  edges: [
    { source: 'modes', target: 'blockers', label: 'AUTO → FULL when it sees' },
    { source: 'blockers', target: 'lifecycle', label: 'then' },
  ],
}
