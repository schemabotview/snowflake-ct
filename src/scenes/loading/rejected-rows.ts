import type { Scene } from '@graphlearning/flow'

// §3 — a dry run finds the bad line, ON_ERROR decides what a real load does with it, and the
// rejects are kept rather than lost.
export const rejectedRows: Scene = {
  id: 'rejected-rows',
  title: 'Find, decide, keep the rejects',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'dry-run',
      kind: 'code',
      filename: 'validate.sql',
      label: `COPY INTO retail.raw.orders FROM @retail.raw.landing/2026/10/03/
  FILE_FORMAT = (FORMAT_NAME = retail.raw.csv_orders)
  VALIDATION_MODE = RETURN_ERRORS;          -- test the files, load nothing`,
    },
    {
      id: 'errors',
      kind: 'table',
      label: 'Returned errors',
      headers: ['ERROR', 'FILE', 'LINE', 'COLUMN_NAME'],
      values: [["Numeric value 'N/A' is not recognized", 'orders_20261003.csv', '5', 'ORDER_TOTAL']],
    },
    {
      id: 'on-error',
      label: 'ON_ERROR — what a real load does',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'oe-abort', label: 'ABORT', sub: 'COPY default: nothing loads', pattern: 'warn', icon: 'ban' },
        { id: 'oe-skip', label: 'SKIP FILE', sub: 'Snowpipe default: file skipped', pattern: 'service', icon: 'file' },
        { id: 'oe-continue', label: 'CONTINUE', sub: 'good rows load; bad ones kept', pattern: 'storage', icon: 'funnel' },
      ],
    },
    {
      id: 'quarantine',
      kind: 'code',
      filename: 'quarantine.sql',
      label: `COPY INTO retail.raw.orders FROM @retail.raw.landing/2026/10/03/
  FILE_FORMAT = (FORMAT_NAME = retail.raw.csv_orders)  ON_ERROR = CONTINUE;

CREATE TABLE retail.raw.orders_rejects AS          -- quarantine: nothing silently lost
  SELECT * FROM TABLE(VALIDATE(retail.raw.orders, JOB_ID => '_last'));`,
    },
  ],
  edges: [
    { source: 'dry-run', target: 'errors' },
    { source: 'errors', target: 'on-error', label: 'then choose' },
    { source: 'on-error', target: 'quarantine', label: 'CONTINUE + keep rejects' },
  ],
}
