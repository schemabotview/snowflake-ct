import type { Scene } from '@graphlearning/flow'

// §4 — two traps: an order just after midnight in London is still 1 October in UTC, and FLOAT
// arithmetic is approximate. BST (UTC+1) applies until 25 October 2026.
export const timeNumbers: Scene = {
  id: 'time-numbers',
  title: 'Which day, and how exact',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'tz-code',
      kind: 'code',
      filename: 'business_date.sql',
      label: `SELECT event_ts_utc,                                           -- TIMESTAMP_NTZ, stored as UTC
       CONVERT_TIMEZONE('UTC', 'Europe/London', event_ts_utc) AS ts_london,
       TO_DATE(ts_london)                                     AS business_date
FROM retail.raw.order_events;`,
    },
    {
      id: 'tz-rows',
      kind: 'table',
      label: 'The same instant, two dates',
      headers: ['EVENT_TS_UTC', 'TS_LONDON', 'UTC DATE', 'BUSINESS_DATE'],
      values: [
        ['2026-10-01 22:10', '2026-10-01 23:10', '2026-10-01', '2026-10-01'],
        ['2026-10-01 23:30', '2026-10-02 00:30', '2026-10-01', '2026-10-02'],
      ],
    },
    {
      id: 'type-traps',
      label: 'Types that decide the answer',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'trap-ntz', label: 'TIMESTAMP', sub: 'means NTZ by default', pattern: 'service', icon: 'clock' },
        { id: 'trap-session', label: 'Session TIMEZONE', sub: 'default Los Angeles', pattern: 'warn', icon: 'globe' },
        { id: 'trap-float', label: 'FLOAT', sub: '0.1 + 0.2 ≠ 0.3', pattern: 'warn', icon: 'hash' },
      ],
    },
    {
      id: 'num-code',
      kind: 'code',
      filename: 'exact.sql',
      label: `SELECT 0.1::FLOAT + 0.2::FLOAT = 0.3::FLOAT;              -- FALSE: binary approximation
SELECT 0.1::NUMBER(10,2) + 0.2::NUMBER(10,2) = 0.3;       -- TRUE: exact decimal
ALTER ACCOUNT SET TIMEZONE = 'Europe/London';             -- say it, don't inherit it`,
    },
  ],
  edges: [
    { source: 'tz-code', target: 'tz-rows' },
    { source: 'tz-rows', target: 'type-traps', label: 'because of types' },
    { source: 'type-traps', target: 'num-code' },
  ],
}
