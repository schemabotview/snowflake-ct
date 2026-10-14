import type { Scene } from '@graphlearning/flow'

// §5 — four ways to get the same data product to consumers, chosen by where they are and whether
// they have a Snowflake account; each moves cost to someone different.
export const distributionOptions: Scene = {
  id: 'distribution-options',
  title: 'Reaching consumers elsewhere',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'options',
      kind: 'table',
      label: 'Distribution options',
      headers: ['Consumer', 'Mechanism', 'Data copied?', 'Provider pays'],
      values: [
        ['same Region, has Snowflake', 'direct share', 'no', 'storage'],
        ['other Region or cloud', 'listing + auto-fulfillment', 'yes, to that Region', 'storage, replication, egress'],
        ['other Region, own control', 'replicate the database, then share', 'yes', 'same, managed by you'],
        ['no Snowflake account', 'reader account', 'no', 'storage + their compute'],
      ],
    },
    {
      id: 'eu-case',
      label: 'The EU franchise partner, Azure West Europe',
      pattern: 'group',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'eu-listing', label: 'Private listing', sub: 'PARTNER_REVENUE', pattern: 'storage', icon: 'tag' },
        { id: 'eu-fulfil', label: 'Auto-fulfillment', sub: 'refreshed copy in EU', pattern: 'service', icon: 'repeat' },
        { id: 'eu-consumer', label: 'EU partner', sub: 'queries locally', pattern: 'user', icon: 'globe' },
      ],
      edges: [
        { source: 'eu-listing', target: 'eu-fulfil' },
        { source: 'eu-fulfil', target: 'eu-consumer' },
      ],
    },
    {
      id: 'eu-questions',
      label: 'Questions a cross-Region copy raises',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'q-residency', label: 'Residency', sub: 'may this data leave the US?', pattern: 'warn', icon: 'shieldcheck' },
        { id: 'q-freshness', label: 'Freshness', sub: 'refresh interval, not live', pattern: 'warn', icon: 'clock' },
        { id: 'q-cost', label: 'Cost', sub: 'billed only where consumers exist', pattern: 'warn', icon: 'receipt' },
      ],
    },
  ],
  edges: [
    { source: 'options', target: 'eu-case', label: 'cross-Region case' },
    { source: 'eu-case', target: 'eu-questions' },
  ],
}
