import type { Scene } from '@graphlearning/flow'

// §1 — the course's recurring retail example, drawn once: three sources become one data product
// that three different consumers read. The requirements band is what makes them different consumers.
export const workloadRequirements: Scene = {
  id: 'workload-requirements',
  title: 'Retail sources, one data product, many consumers',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'sources',
      label: 'Sources',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'orders', label: 'Orders', sub: 'app database, hourly', pattern: 'external', icon: 'receipt' },
        { id: 'customers', label: 'Customer updates', sub: 'CRM change feed', pattern: 'external', icon: 'users' },
        { id: 'reference', label: 'Reference data', sub: 'products and stores', pattern: 'external', icon: 'table' },
      ],
    },
    {
      id: 'middle',
      label: 'Snowflake',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'product',
          label: 'Analytical data product',
          pattern: 'storage',
          cols: 2,
          children: [
            { id: 'details', label: 'Order details', sub: 'one row per order, cleaned', pattern: 'storage', icon: 'table' },
            { id: 'summaries', label: 'Business summaries', sub: 'revenue by day and store', pattern: 'storage', icon: 'barchart' },
          ],
        },
        {
          id: 'requirements',
          label: 'Requirements',
          pattern: 'warn',
          cols: 4,
          children: [
            { id: 'freshness', label: 'Freshness', sub: 'how stale is acceptable', pattern: 'warn', icon: 'clock' },
            { id: 'correctness', label: 'Correctness', sub: 'one row per order', pattern: 'warn', icon: 'circlecheck' },
            { id: 'cost', label: 'Cost', sub: 'compute and storage', pattern: 'warn', icon: 'gauge' },
            { id: 'ownership', label: 'Ownership', sub: 'who defines revenue', pattern: 'warn', icon: 'key' },
          ],
        },
      ],
    },
    {
      id: 'consumers',
      label: 'Consumers',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'finance', label: 'Finance dashboard', sub: 'daily revenue', pattern: 'user', icon: 'barchart' },
        { id: 'analysts', label: 'Analysts', sub: 'ad-hoc questions', pattern: 'user', icon: 'search' },
        { id: 'app', label: 'Customer app', sub: 'order status in minutes', pattern: 'user', icon: 'monitor' },
      ],
    },
  ],
  edges: [
    { source: 'sources', target: 'middle', label: 'load + transform' },
    { source: 'middle', target: 'consumers', label: 'serve' },
  ],
}
