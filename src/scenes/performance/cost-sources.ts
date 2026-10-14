import type { Scene } from '@graphlearning/flow'

// §7 — every credit-consuming feature the retail product now uses, where it shows up, and what
// drives it. Monthly figures are illustrative assumptions in credits.
export const costSources: Scene = {
  id: 'cost-sources',
  title: 'Every line on the bill has a driver',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'ledger',
      kind: 'table',
      label: 'October ledger — illustrative credits',
      headers: ['Source', 'Driver', 'Credits', 'Where to see it'],
      values: [
        ['BI_WH', 'hours running × size', '310', 'WAREHOUSE_METERING_HISTORY'],
        ['LOAD_WH', 'hours running × size', '75', 'WAREHOUSE_METERING_HISTORY'],
        ['REVENUE_DT refreshes', 'on LOAD_WH above', '(in LOAD_WH)', 'DYNAMIC_TABLE_REFRESH_HISTORY'],
        ['Serverless tasks', 'compute used', '9', 'SERVERLESS_TASK_HISTORY'],
        ['Snowpipe', 'GB ingested', '2', 'PIPE_USAGE_HISTORY'],
        ['Automatic clustering', 'table churn', '180', 'AUTOMATIC_CLUSTERING_HISTORY'],
        ['Data quality metrics', 'scheduled DMF runs', '6', 'DATA_QUALITY_MONITORING_USAGE_HISTORY'],
        ['Cloud services', 'above 10% of daily warehouse', '0', 'METERING_DAILY_HISTORY'],
      ],
    },
    {
      id: 'storage',
      kind: 'table',
      label: 'Storage — billed per TB-month, not in credits',
      headers: ['Kind', 'Average', 'Driver'],
      values: [
        ['Active table data', '1.4 TB', 'what you keep'],
        ['Time Travel', '0.3 TB', 'retention × churn'],
        ['Fail-safe', '0.5 TB', '7 days × churn, permanent tables'],
      ],
    },
    {
      id: 'transfer',
      label: 'And data that leaves',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 't-unload', label: 'Unload / egress', sub: 'to another Region or cloud', pattern: 'warn', icon: 'globe' },
        { id: 't-repl', label: 'Replication', sub: 'chapter 10', pattern: 'warn', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'ledger', target: 'storage', label: 'plus' },
    { source: 'storage', target: 'transfer', label: 'plus' },
  ],
}
