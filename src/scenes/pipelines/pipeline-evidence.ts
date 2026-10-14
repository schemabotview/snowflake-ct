import type { Scene } from '@graphlearning/flow'

// §7 — a scheduled run proves only that it ran. Data metric functions test the data; history
// views prove what ran; an alert turns a failed expectation into a message.
export const pipelineEvidence: Scene = {
  id: 'pipeline-evidence',
  title: 'Prove the data, not just the run',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'dmf-code',
      kind: 'code',
      filename: 'quality.sql',
      label: `ALTER TABLE retail.sales.orders SET DATA_METRIC_SCHEDULE = '60 MINUTE';
ALTER TABLE retail.sales.orders ADD DATA METRIC FUNCTION
  SNOWFLAKE.CORE.DUPLICATE_COUNT ON (order_id),
  SNOWFLAKE.CORE.NULL_COUNT      ON (order_total),
  SNOWFLAKE.CORE.FRESHNESS       ON (updated_at);

CREATE ALERT retail.ops.orders_stale WAREHOUSE = bi_wh SCHEDULE = '30 MINUTE'
  IF (EXISTS (SELECT 1 FROM snowflake.local.data_quality_monitoring_results
              WHERE table_name = 'ORDERS' AND metric_name = 'FRESHNESS'
                AND value > 3600))                          -- older than an hour
  THEN CALL SYSTEM$SEND_EMAIL(...);`,
    },
    {
      id: 'dmf-results',
      kind: 'table',
      label: 'Latest results for SALES.ORDERS',
      headers: ['Metric', 'Column', 'Value', 'Expected', 'Status'],
      values: [
        ['DUPLICATE_COUNT', 'ORDER_ID', '0', '0', 'pass'],
        ['NULL_COUNT', 'ORDER_TOTAL', '0', '0', 'pass'],
        ['FRESHNESS', 'UPDATED_AT', '720 s', '≤ 3600 s', 'pass'],
      ],
    },
    {
      id: 'evidence',
      label: 'Three kinds of evidence',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'ev-task', label: 'TASK_HISTORY', sub: 'what ran, when, result', pattern: 'service', icon: 'history' },
        { id: 'ev-dt', label: 'DT refresh history', sub: 'actual lag, mode, errors', pattern: 'service', icon: 'gauge' },
        { id: 'ev-dmf', label: 'Quality results', sub: 'what the data looks like', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'dmf-code', target: 'dmf-results', label: 'measured hourly' },
    { source: 'dmf-results', target: 'evidence', label: 'alongside' },
  ],
}
