import type { Scene } from '@graphlearning/flow'

// §6 — where operational evidence lives, how fresh it is, how long it lasts, and who can read it.
// The incident in §5 needed the fresh one; the monthly review needs the long one.
export const telemetrySources: Scene = {
  id: 'telemetry-sources',
  title: 'Fresh or long, rarely both',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'sources',
      kind: 'table',
      label: 'Where operational evidence lives',
      headers: ['', 'INFORMATION_SCHEMA', 'ACCOUNT_USAGE', 'Event table'],
      values: [
        ['Latency', 'none', '45 min – 3 h', 'near real time'],
        ['History', '7 days – 6 months', '1 year', 'your retention'],
        ['Scope', 'one database', 'whole account, dropped objects too', 'what you log'],
        ['Default access', 'objects you can see', 'ACCOUNTADMIN only', 'grants on the table'],
        ['Use for', 'the incident now', 'trends, audit, cost', 'procedure and app logs'],
      ],
    },
    {
      id: 'access-code',
      kind: 'code',
      filename: 'grant_telemetry.sql',
      label: `-- give operators the evidence without giving them ACCOUNTADMIN
GRANT DATABASE ROLE snowflake.usage_viewer      TO ROLE retail_ops;
GRANT DATABASE ROLE snowflake.governance_viewer TO ROLE retail_auditor;`,
    },
    {
      id: 'choose',
      label: 'Which source for which question',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'cq-now', label: 'Failing now?', sub: 'INFORMATION_SCHEMA', pattern: 'user', icon: 'bell' },
        { id: 'cq-month', label: 'Last month?', sub: 'ACCOUNT_USAGE', pattern: 'user', icon: 'calendar' },
        { id: 'cq-why', label: 'Inside the code?', sub: 'event table logs', pattern: 'user', icon: 'code' },
      ],
    },
  ],
  edges: [
    { source: 'sources', target: 'access-code', label: 'readable by' },
    { source: 'access-code', target: 'choose' },
  ],
}
