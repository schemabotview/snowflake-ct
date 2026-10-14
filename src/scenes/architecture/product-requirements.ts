import type { Scene } from '@graphlearning/flow'

// §1 — the product starts from its consumers, not its tables. Each consumer states what it reads, how
// fresh, under which contract and access; the product record names who owns what.
export const productRequirements: Scene = {
  id: 'product-requirements',
  title: 'Consumers first, tables second',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'consumers',
      label: 'Who the retail product serves',
      pattern: 'user',
      cols: 4,
      children: [
        { id: 'c-finance', label: 'Finance', sub: 'revenue dashboard', pattern: 'user', icon: 'monitor' },
        { id: 'c-stores', label: 'Store managers', sub: 'their own store only', pattern: 'user', icon: 'users' },
        { id: 'c-partner', label: 'York partner', sub: 'shared daily figures', pattern: 'user', icon: 'share' },
        { id: 'c-science', label: 'Data science', sub: 'order and customer history', pattern: 'user', icon: 'brain' },
      ],
    },
    {
      id: 'reqs',
      kind: 'table',
      label: 'Requirements, consumer by consumer',
      headers: ['Consumer', 'Reads', 'Freshness', 'Contract', 'Access'],
      values: [
        ['Finance', 'DAILY_REVENUE_V2', '≤ 30 min, 07–19h', 'v2, net of refunds', 'ANALYST'],
        ['Store managers', 'SALES.ORDERS', 'by 07:00', 'stable columns', 'STORE_ROWS'],
        ['York partner', 'share of V2', 'daily by 06:00', 'versioned', 'PARTNER_READ'],
        ['Data science', 'ORDER_LINES, DIM', 'daily', 'as-was customers', 'EMAIL masked'],
      ],
    },
    {
      id: 'product',
      kind: 'code',
      filename: 'product.yml',
      label: `product: retail_sales
owner:   retail-data team         # accountable for every output
steward: finance                  # owns the definition of revenue
outputs:
  - SALES.DAILY_REVENUE_V2        # 30 min, versioned contract
  - SALES.ORDERS                  # row policy STORE_ROWS
inputs:
  - RAW.ORDERS                    # files from LOADER_SVC
  - RAW.CUSTOMER_CHANGES          # CDC, may arrive late`,
    },
    {
      id: 'roles',
      label: 'Ownership, stated once',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-owner', label: 'Owner', sub: 'runs it, fixes it', pattern: 'service', icon: 'usercheck' },
        { id: 'r-steward', label: 'Steward', sub: 'owns the definitions', pattern: 'service', icon: 'scale' },
        { id: 'r-consumer', label: 'Consumers', sub: 'agree the contract', pattern: 'service', icon: 'receipt' },
      ],
    },
  ],
  edges: [
    { source: 'consumers', target: 'reqs', label: 'each states' },
    { source: 'reqs', target: 'product', label: 'recorded as' },
    { source: 'product', target: 'roles', label: 'names' },
  ],
}
