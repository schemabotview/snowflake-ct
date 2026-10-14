import type { Scene } from '@graphlearning/flow'

// §4 — RETAILCO shares York-store revenue with its York franchise partner in the same Region. No
// data is copied; the consumer queries read-only with its own warehouse.
export const shareFlow: Scene = {
  id: 'share-flow',
  title: 'Shared, not copied',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'accounts',
      label: 'Two accounts, one copy of the data',
      pattern: 'group',
      flow: 'LR',
      cols: 2,
      children: [
        {
          id: 'provider',
          label: 'Provider: RETAILCO.PROD',
          pattern: 'storage',
          cols: 1,
          children: [
            { id: 'pv-view', label: 'Partner view', sub: 'secure, S-02 only', pattern: 'storage', icon: 'layers' },
            { id: 'pv-role', label: 'PARTNER_READ', sub: 'database role', pattern: 'storage', icon: 'usercheck' },
            { id: 'pv-share', label: 'Share', sub: 'YORK_PARTNER_SHARE', pattern: 'storage', icon: 'share' },
          ],
          edges: [
            { source: 'pv-view', target: 'pv-role', label: 'SELECT granted to' },
            { source: 'pv-role', target: 'pv-share', label: 'granted to' },
          ],
        },
        {
          id: 'consumer',
          label: 'Consumer: YORKCO, same Region',
          pattern: 'user',
          cols: 1,
          children: [
            { id: 'cs-db', label: 'Shared database', sub: 'read-only, no copy', pattern: 'user', icon: 'database' },
            { id: 'cs-role', label: 'Their own role', sub: 'granted PARTNER_READ', pattern: 'user', icon: 'users' },
            { id: 'cs-wh', label: 'Their warehouse', sub: 'they pay the compute', pattern: 'user', icon: 'cpu' },
          ],
          edges: [
            { source: 'cs-db', target: 'cs-role' },
            { source: 'cs-role', target: 'cs-wh', label: 'queries with' },
          ],
        },
      ],
      edges: [{ source: 'provider', target: 'consumer', label: 'live, no copy' }],
    },
    {
      id: 'share-detail',
      label: 'Set up and responsibilities',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'share-code',
          kind: 'code',
          filename: 'share.sql',
          label: `CREATE DATABASE ROLE retail.partner_read;
GRANT SELECT ON VIEW retail.sales.partner_revenue
  TO DATABASE ROLE retail.partner_read;
CREATE SHARE york_partner_share;
GRANT USAGE ON DATABASE retail TO SHARE york_partner_share;
GRANT DATABASE ROLE retail.partner_read
  TO SHARE york_partner_share;
ALTER SHARE york_partner_share ADD ACCOUNTS = yorkco.main;`,
        },
        {
          id: 'responsibilities',
          kind: 'table',
          label: 'Who is responsible for what',
          headers: ['Concern', 'Provider', 'Consumer'],
          values: [
            ['Storage cost', 'yes', 'no'],
            ['Query compute', 'no', 'yes'],
            ['Correctness, freshness', 'yes', '—'],
            ['Who in their org sees it', '—', 'yes'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'accounts', target: 'share-detail', label: 'built by' }],
}
