import type { Scene } from '@graphlearning/flow'

// §6 — an assumption-based monthly ledger beside the warehouse lifecycle. Rates are standard
// warehouse credits per hour (Small 2, Medium 4); the ledger says "credits", never a price.
export const costLedger: Scene = {
  id: 'cost-ledger',
  title: 'Where the credits go, and what suspending does',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'warehouse-ddl',
      kind: 'code',
      filename: 'bi_wh.sql',
      label: `CREATE WAREHOUSE bi_wh WITH
  WAREHOUSE_SIZE      = 'SMALL'  -- 2 credits per hour
  AUTO_SUSPEND        = 60       -- seconds idle, then stop
  AUTO_RESUME         = TRUE     -- start on the next query
  INITIALLY_SUSPENDED = TRUE;    -- no credits until used`,
    },
    {
      id: 'ledger',
      kind: 'table',
      label: 'Monthly ledger — assumptions, not a quote',
      headers: ['Item', 'Assumption', 'Billed as'],
      values: [
        ['BI_WH (Small)', '2 cr/h × 6 h × 22 days', '264 credits'],
        ['LOAD_WH (Medium)', '4 cr/h × 0.5 h × 30 days', '60 credits'],
        ['Cloud services', 'only above 10% of daily warehouse use', 'usually 0'],
        ['Serverless', 'Snowpipe, serverless tasks', 'metered per feature'],
        ['Storage', '1.5 TB average on disk', 'per TB per month'],
        ['Compute total', 'BI_WH + LOAD_WH', '324 credits'],
      ],
    },
    {
      id: 'lifecycle',
      label: 'Warehouse lifecycle',
      pattern: 'service',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'running', label: 'Running', sub: 'per second, 60 s minimum', pattern: 'service', icon: 'power' },
        { id: 'suspended', label: 'Suspended', sub: 'no credits, cache lost', pattern: 'storage', icon: 'clock' },
        { id: 'dropped', label: 'Dropped', sub: 'table data still stored', pattern: 'warn', icon: 'trash' },
      ],
      edges: [
        { source: 'running', target: 'suspended', label: 'idle' },
        { source: 'suspended', target: 'dropped', label: 'DROP' },
      ],
    },
  ],
  edges: [
    { source: 'warehouse-ddl', target: 'ledger', label: 'size sets the rate' },
    { source: 'ledger', target: 'lifecycle', label: 'hours depend on' },
  ],
}
