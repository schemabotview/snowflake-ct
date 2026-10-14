import type { Scene } from '@graphlearning/flow'

// §5 — auto-ingest: a file lands, S3 notifies a Snowflake-managed queue, the pipe runs its COPY on
// serverless compute, and three places record what happened.
export const snowpipeFlow: Scene = {
  id: 'snowpipe-flow',
  title: 'Files load themselves, minutes after landing',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'pipe-path',
      label: 'Auto-ingest path',
      pattern: 'group',
      flow: 'LR',
      cols: 4,
      children: [
        { id: 'sp-file', label: 'File lands', sub: 'retailco-landing/orders', pattern: 'external', icon: 'file' },
        { id: 'sp-event', label: 'S3 event', sub: 'to a Snowflake queue', pattern: 'network', icon: 'bell' },
        { id: 'sp-pipe', label: 'ORDERS_PIPE', sub: 'serverless COPY', pattern: 'service', icon: 'workflow' },
        { id: 'sp-table', label: 'RAW.ORDERS', sub: 'rows, minutes later', pattern: 'storage', icon: 'table' },
      ],
      edges: [
        { source: 'sp-file', target: 'sp-event' },
        { source: 'sp-event', target: 'sp-pipe' },
        { source: 'sp-pipe', target: 'sp-table' },
      ],
    },
    {
      id: 'copy-vs-pipe',
      kind: 'table',
      label: 'Bulk COPY versus Snowpipe',
      headers: ['', 'COPY', 'Snowpipe'],
      values: [
        ['Triggered by', 'you or a schedule', 'a file event'],
        ['Compute', 'your warehouse', 'serverless'],
        ['Billed as', 'warehouse time', 'per GB ingested'],
        ['Load metadata', '64 days, per table', '14 days, per pipe'],
        ['ON_ERROR default', 'ABORT_STATEMENT', 'SKIP_FILE'],
      ],
    },
    {
      id: 'pipe-code',
      kind: 'code',
      filename: 'orders_pipe.sql',
      label: `CREATE PIPE retail.raw.orders_pipe AUTO_INGEST = TRUE AS
  COPY INTO retail.raw.orders
  FROM @retail.raw.landing
  FILE_FORMAT = (FORMAT_NAME = retail.raw.csv_orders);   -- ON_ERROR defaults to SKIP_FILE

SHOW PIPES;   -- notification_channel: the queue ARN to target from S3 event notifications`,
    },
    {
      id: 'evidence',
      label: 'Operational evidence',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'ev-status', label: 'PIPE_STATUS', sub: 'pending files, state', pattern: 'user', icon: 'gauge' },
        { id: 'ev-copy', label: 'COPY_HISTORY', sub: 'per file: rows, errors', pattern: 'user', icon: 'history' },
        { id: 'ev-usage', label: 'PIPE_USAGE', sub: 'credits, bytes billed', pattern: 'user', icon: 'receipt' },
      ],
    },
  ],
  edges: [
    { source: 'pipe-path', target: 'copy-vs-pipe', label: 'compared' },
    { source: 'copy-vs-pipe', target: 'pipe-code', label: 'defined by' },
    { source: 'pipe-code', target: 'evidence', label: 'observed through' },
  ],
}
