import type { Scene } from '@graphlearning/flow'

// §3 — two order events from ch.4's stream: one with two items, one with none. FLATTEN turns one
// event into one row per item; OUTER => TRUE keeps the event that has no items.
export const variantFlatten: Scene = {
  id: 'variant-flatten',
  title: 'One event becomes many rows',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'events',
      kind: 'code',
      filename: 'RAW.ORDER_EVENTS.payload',
      label: `{ "order_id": 1007, "customer": { "id": "C-412" },
  "items": [ { "sku": "P-10", "qty": 2, "price": 12.50 },
             { "sku": "P-22", "qty": 1, "price": 30.00 } ] }

{ "order_id": 1008, "customer": { "id": "C-150" }, "items": [] }`,
    },
    {
      id: 'flatten-code',
      kind: 'code',
      filename: 'order_items.sql',
      label: `SELECT e.payload:order_id::NUMBER       AS order_id,
       e.payload:customer.id::VARCHAR   AS customer_id,     -- path into an object
       i.value:sku::VARCHAR             AS sku,
       i.value:qty::NUMBER * i.value:price::NUMBER(10,2) AS line_amount
FROM retail.raw.order_events e,
     LATERAL FLATTEN(input => e.payload:items, OUTER => TRUE) i;
-- e.payload:Order_Id would be NULL: keys are case-sensitive`,
    },
    {
      id: 'flat-rows',
      kind: 'table',
      label: 'Result — 2 events in, 3 rows out',
      headers: ['ORDER_ID', 'CUSTOMER_ID', 'SKU', 'LINE_AMOUNT'],
      values: [
        ['1007', 'C-412', 'P-10', '25.00'],
        ['1007', 'C-412', 'P-22', '30.00'],
        ['1008', 'C-150', 'NULL', 'NULL'],
      ],
    },
  ],
  edges: [
    { source: 'events', target: 'flatten-code', label: 'VARIANT payload' },
    { source: 'flatten-code', target: 'flat-rows', label: 'one row per item' },
  ],
}
