import type { Scene } from '@graphlearning/flow'

// §1 — the four kinds of stage, the file format that tells COPY how to read the files, and a
// LIST of what landed for 1 October.
export const stageTypes: Scene = {
  id: 'stage-types',
  title: 'Where files wait, and how they are read',
  flow: 'TB',
  padding: 0.06,
  nodes: [
    {
      id: 'stages',
      label: 'Stages — named locations for files',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'internal-stages',
          label: 'Internal: Snowflake stores the files',
          pattern: 'storage',
          cols: 3,
          children: [
            { id: 'stage-user', label: 'User stage', sub: '@~  one per user', pattern: 'storage', icon: 'users' },
            { id: 'stage-table', label: 'Table stage', sub: '@%orders  one per table', pattern: 'storage', icon: 'table' },
            { id: 'stage-named-int', label: 'Named internal', sub: '@RAW.UPLOADS  shared', pattern: 'storage', icon: 'folder' },
          ],
        },
        {
          id: 'external-stages',
          label: 'External: your cloud storage',
          pattern: 'external',
          flow: 'LR',
          cols: 3,
          children: [
            { id: 'stage-landing', label: 'Named external', sub: '@RAW.LANDING', pattern: 'external', icon: 'folder' },
            { id: 'stage-int', label: 'S3_RETAIL_INT', sub: 'identity + allowed paths', pattern: 'network', icon: 'plug' },
            { id: 'stage-bucket', label: 'S3 bucket', sub: 'retailco-landing', pattern: 'external', icon: 'harddrive' },
          ],
          edges: [
            { source: 'stage-landing', target: 'stage-int' },
            { source: 'stage-int', target: 'stage-bucket' },
          ],
        },
      ],
    },
    {
      id: 'format-code',
      kind: 'code',
      filename: 'csv_orders.sql',
      label: `CREATE FILE FORMAT retail.raw.csv_orders
  TYPE = CSV  SKIP_HEADER = 1  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  DATE_FORMAT = 'DD/MM/YYYY'  NULL_IF = ('', 'NULL');

LIST @retail.raw.landing/2026/10/01/;`,
    },
    {
      id: 'listing',
      kind: 'table',
      label: 'LIST result',
      headers: ['name', 'size', 'last_modified'],
      values: [
        ['…/2026/10/01/orders_20261001.csv', '412', '2026-10-02 05:58'],
        ['…/2026/10/01/orders_resend.csv', '208', '2026-10-02 08:51'],
      ],
    },
  ],
  edges: [
    { source: 'stages', target: 'format-code', label: 'read with a file format' },
    { source: 'format-code', target: 'listing', label: 'what is waiting' },
  ],
}
