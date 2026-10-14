import type { Scene } from '@graphlearning/flow'

// §5 — 7 October: the dashboard shows yesterday's revenue at 08:00. The diagnosis walks backwards
// from the symptom through each layer's evidence until it finds the first thing that broke.
export const incidentDiagnosis: Scene = {
  id: 'incident-diagnosis',
  title: 'Walk back from the symptom',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'chain',
      label: '7 October 08:00 — revenue stale',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'ch-dash', label: 'Dashboard', sub: 'shows 6 Oct totals', pattern: 'user', icon: 'monitor' },
        { id: 'ch-dt', label: 'REVENUE_DT', sub: 'last refresh 05:41, OK', pattern: 'storage', icon: 'barchart' },
        { id: 'ch-task', label: 'CLEAN_ORDERS', sub: 'skipped: root failed', pattern: 'warn', icon: 'funnel' },
        { id: 'ch-load', label: 'LOAD_ORDERS', sub: 'FAILED 05:30', pattern: 'warn', icon: 'package' },
        { id: 'ch-cause', label: 'Root cause', sub: 'integration lost S3 access', pattern: 'warn', icon: 'bug' },
      ],
      edges: [
        { source: 'ch-dash', target: 'ch-dt', label: 'reads' },
        { source: 'ch-dt', target: 'ch-task', label: 'source unchanged' },
        { source: 'ch-task', target: 'ch-load', label: 'waits on' },
        { source: 'ch-load', target: 'ch-cause', label: 'error says' },
      ],
    },
    {
      id: 'evidence',
      label: 'Evidence at each step',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'diag-code',
          kind: 'code',
          filename: 'diagnose.sql',
          label: `SELECT name, state, error_message, scheduled_time
FROM TABLE(retail.information_schema.task_history(
  SCHEDULED_TIME_RANGE_START =>
    DATEADD(hour, -6, CURRENT_TIMESTAMP())))
WHERE state <> 'SUCCEEDED';
-- LOAD_ORDERS | FAILED | Access Denied ... s3://retailco-landing`,
        },
        {
          id: 'timeline',
          kind: 'table',
          label: 'Incident timeline',
          headers: ['Time', 'Event'],
          values: [
            ['6 Oct 22:10', 'IAM role trust policy edited in AWS'],
            ['7 Oct 05:30', 'LOAD_ORDERS fails; graph stops'],
            ['7 Oct 06:00', 'no alert: failure alert not configured'],
            ['7 Oct 08:00', 'finance reports stale numbers'],
            ['7 Oct 08:40', 'trust policy fixed; RETRY LAST'],
          ],
        },
        {
          id: 'gaps',
          kind: 'table',
          label: 'Fixes beyond the fix',
          headers: ['Gap', 'Follow-up'],
          values: [
            ['nobody alerted', 'error notification on the root task'],
            ['AWS change unseen', 'integration change → Snowflake owner review'],
            ['finance found it first', 'freshness alert, ch. 7'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'chain', target: 'evidence', label: 'proved by' }],
}
