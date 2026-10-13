import type { Scene } from '@graphlearning/flow'

// §3 — one organisation, three accounts, each pinned to a cloud, a Region and an edition. The code
// card shows the identifier form clients connect with.
const account = (key: string, name: string, cloud: string, region: string, edition: string) => ({
  id: `acct-${key}`,
  label: `Account ${name}`,
  pattern: 'service' as const,
  cols: 1,
  children: [
    { id: `${key}-cloud`, label: cloud, sub: 'cloud platform', pattern: 'network' as const, icon: 'cloud' },
    { id: `${key}-region`, label: region, sub: 'Snowflake Region', pattern: 'network' as const, icon: 'globe' },
    { id: `${key}-edition`, label: edition, sub: 'edition', pattern: 'service' as const, icon: 'tag' },
  ],
})

export const orgAccounts: Scene = {
  id: 'org-accounts',
  title: 'Organisation, accounts, Regions and editions',
  flow: 'TB',
  nodes: [
    {
      id: 'org',
      label: 'Organisation RETAILCO',
      pattern: 'group',
      cols: 3,
      children: [
        account('prod', 'PROD', 'AWS', 'US West (Oregon)', 'Enterprise'),
        account('euprod', 'EUPROD', 'Azure', 'West Europe', 'Business Critical'),
        account('dev', 'DEV', 'AWS', 'US West (Oregon)', 'Standard'),
      ],
    },
    {
      id: 'identifier',
      kind: 'code',
      filename: 'connect.txt',
      label: `-- account identifier: <orgname>-<account_name>
retailco-prod
retailco-euprod

-- account URL
https://retailco-prod.snowflakecomputing.com`,
    },
  ],
  edges: [{ source: 'org', target: 'identifier', label: 'clients name one account' }],
}
