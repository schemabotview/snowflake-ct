import type { Scene } from '@graphlearning/flow'

// §6 — a line-grain fact surrounded by dimensions; the customer dimension keeps history, so
// revenue can be reported by the city a customer lived in at the time of the order.
export const dimensionalModel: Scene = {
  id: 'dimensional-model',
  title: 'Facts at one grain, dimensions with history',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'star',
      label: 'Star schema — RETAIL.MART',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'dim-date', label: 'DIM_DATE', sub: 'calendar, fiscal week', pattern: 'service', icon: 'calendar' },
        { id: 'fact-lines', label: 'Fact: lines', sub: 'FACT_ORDER_LINES, one row per line', pattern: 'storage', icon: 'table' },
        { id: 'dim-product', label: 'DIM_PRODUCT', sub: 'sku, category', pattern: 'service', icon: 'package' },
        { id: 'dim-store', label: 'DIM_STORE', sub: 'S-01 Leeds, S-02 York', pattern: 'service', icon: 'building' },
        { id: 'dim-customer', label: 'DIM_CUSTOMER', sub: 'history kept', pattern: 'warn', icon: 'users' },
        { id: 'definition', label: 'Revenue', sub: 'defined once, versioned', pattern: 'user', icon: 'scroll' },
      ],
    },
    {
      id: 'scd-rows',
      kind: 'table',
      label: 'DIM_CUSTOMER for C-207 — a new row per change',
      headers: ['CUSTOMER_KEY', 'CUSTOMER_ID', 'CITY', 'VALID_FROM', 'VALID_TO', 'IS_CURRENT'],
      values: [
        ['17', 'C-207', 'Hull', '2025-03-14', '2026-10-02 11:30', 'FALSE'],
        ['42', 'C-207', 'York', '2026-10-02 11:30', '9999-12-31', 'TRUE'],
      ],
    },
    {
      id: 'as-was',
      kind: 'table',
      label: 'C-207\'s 1 October revenue, two ways',
      headers: ['Question', 'City', 'Revenue'],
      values: [
        ['as it was (join on order time)', 'Hull', '164.40'],
        ['as it is (current row only)', 'York', '164.40'],
      ],
    },
  ],
  edges: [
    { source: 'star', target: 'scd-rows', label: 'customer history' },
    { source: 'scd-rows', target: 'as-was', label: 'reported' },
  ],
}
