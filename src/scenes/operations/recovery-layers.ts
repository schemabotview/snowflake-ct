import type { Scene } from '@graphlearning/flow'

// §7 — four recovery mechanisms by who can use them, how far back they reach, and what they
// survive. Fail-safe is Snowflake's, not yours; backups are the only one you can lock.
export const recoveryLayers: Scene = {
  id: 'recovery-layers',
  title: 'What can bring data back, and who holds the key',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'layers',
      kind: 'table',
      label: 'Recovery mechanisms',
      headers: ['Mechanism', 'Who restores', 'Reach', 'Survives'],
      values: [
        ['Time Travel', 'you', '0–90 days (permanent tables)', 'bad DML, DROP'],
        ['Fail-safe', 'Snowflake support only', '7 days after Time Travel', 'last resort, best effort'],
        ['Clone', 'you', 'the moment it was taken', 'mistakes after it'],
        ['Backup set', 'you', 'its schedule and expiry', 'retention cut; lockable'],
      ],
    },
    {
      id: 'boundaries',
      kind: 'table',
      label: 'Boundaries by table type',
      headers: ['Table', 'Time Travel', 'Fail-safe'],
      values: [
        ['permanent: SALES.ORDERS', 'up to 90 days', 'yes'],
        ['transient: RAW.ORDERS_BATCH', '0–1 day', 'no'],
        ['Iceberg, your storage', 'by catalog', 'no: your cloud backups'],
      ],
    },
    {
      id: 'backup-code',
      kind: 'code',
      filename: 'backups.sql — sketch',
      label: `-- shape only: check CREATE BACKUP POLICY / SET for exact options
CREATE BACKUP POLICY retail.ops.daily_30d      -- schedule: daily; expire: 30 days
  ...;                                          -- retention lock: Business Critical,
CREATE BACKUP SET retail.ops.sales_backups      --   irreversible — only when deletion
  FOR DATABASE retail                           --   must be impossible for everyone
  WITH BACKUP POLICY retail.ops.daily_30d;`,
    },
  ],
  edges: [
    { source: 'layers', target: 'boundaries', label: 'limited by' },
    { source: 'boundaries', target: 'backup-code', label: 'so add' },
  ],
}
