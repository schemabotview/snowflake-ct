import type { Scene } from '@graphlearning/flow'

// §3 — who actually read EMAIL in October, answered from ACCESS_HISTORY, and what that evidence
// can and cannot prove.
export const auditEvidence: Scene = {
  id: 'audit-evidence',
  title: 'Who read the email column?',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'audit-query',
      label: 'October, from ACCESS_HISTORY',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'audit-code',
          kind: 'code',
          filename: 'who_read_email.sql',
          label: `USE SCHEMA snowflake.account_usage;

SELECT ah.user_name, q.role_name,
       COUNT(*) AS queries,
       ANY_VALUE(ah.policies_referenced)
FROM access_history ah
JOIN query_history q USING (query_id),
  LATERAL FLATTEN(ah.base_objects_accessed) o,
  LATERAL FLATTEN(o.value:columns) c
WHERE o.value:objectName
        = 'RETAIL.SALES.CUSTOMERS'
  AND c.value:columnName = 'EMAIL'
  AND ah.query_start_time >= '2026-10-01'
GROUP BY 1, 2;`,
        },
        {
          id: 'audit-result',
          kind: 'table',
          label: 'Result',
          headers: ['USER', 'ROLE', 'QUERIES', 'MASKED?'],
          values: [
            ['ANA', 'ANALYST', '41', 'yes — mask_email'],
            ['SUPPORT_BOT', 'SUPPORT', '1,206', 'no — allowed'],
            ['LOADER_SVC', 'LOADER', '30', 'n/a — wrote, ETL'],
          ],
        },
      ],
      edges: [{ source: 'audit-code', target: 'audit-result' }],
    },
    {
      id: 'limits',
      label: 'What this evidence can and cannot prove',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'lim-can', label: 'Can show', sub: 'who touched which column, under which policy', pattern: 'storage', icon: 'circlecheck' },
        { id: 'lim-cannot', label: 'Cannot show', sub: 'what happened to the rows afterwards', pattern: 'warn', icon: 'circleslash' },
        { id: 'lim-latency', label: 'Latency', sub: 'hours behind real time', pattern: 'warn', icon: 'clock' },
        { id: 'lim-access', label: 'Access to it', sub: 'Enterprise; needs SNOWFLAKE db grants', pattern: 'service', icon: 'key' },
      ],
    },
  ],
  edges: [{ source: 'audit-query', target: 'limits', label: 'evidence, with limits' }],
}
