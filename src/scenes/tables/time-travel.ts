import type { Scene } from '@graphlearning/flow'

// §6 — an UPDATE without a WHERE at 14:05, noticed at 14:20, read and repaired from Time Travel.
export const timeTravel: Scene = {
  id: 'time-travel',
  title: 'Reading and restoring the past',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'incident',
      label: 'The incident, 2 October',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'tt-load', label: '10:00 load', sub: '6 orders, 3 statuses', pattern: 'storage', icon: 'package' },
        { id: 'tt-bad', label: '14:05 UPDATE', sub: 'no WHERE: all CANCELLED', pattern: 'warn', icon: 'bug' },
        { id: 'tt-noticed', label: '14:20 noticed', sub: 'revenue shows 0', pattern: 'warn', icon: 'bell' },
      ],
      edges: [
        { source: 'tt-load', target: 'tt-bad' },
        { source: 'tt-bad', target: 'tt-noticed' },
      ],
    },
    {
      id: 'tt-code',
      kind: 'code',
      filename: 'repair.sql',
      label: `-- 1. look before acting: the table as it was just before the bad statement
SELECT order_status, COUNT(*) FROM retail.sales.orders
  BEFORE (STATEMENT => '01b2c3d4-0000-…')   -- query ID of the UPDATE
GROUP BY order_status;                       -- SHIPPED 4, PENDING 1, CANCELLED 1

-- 2. repair: clone the past, then swap it in
CREATE TABLE retail.sales.orders_fixed CLONE retail.sales.orders
  BEFORE (STATEMENT => '01b2c3d4-0000-…');
ALTER TABLE retail.sales.orders SWAP WITH retail.sales.orders_fixed;

-- dropped by mistake?  UNDROP TABLE retail.sales.orders;  (within retention)`,
    },
  ],
  edges: [{ source: 'incident', target: 'tt-code', label: 'within the retention period' }],
}
