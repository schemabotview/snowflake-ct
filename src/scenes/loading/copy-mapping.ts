import type { Scene } from '@graphlearning/flow'

// §2 — CSV lines in, a COPY that names its columns and converts explicitly, typed rows out.
export const copyMapping: Scene = {
  id: 'copy-mapping',
  title: 'File positions to typed columns',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'csv-lines',
      kind: 'code',
      filename: 'orders_20261001.csv',
      label: `order_id,customer,date,status,total
1001,C-207,01/10/2026,shipped,89.50
1002,C-311,01/10/2026,pending,58.00
1003,C-207,01/10/2026,shipped,74.90`,
    },
    {
      id: 'copy-code',
      kind: 'code',
      filename: 'copy_orders.sql',
      label: `COPY INTO retail.raw.orders
  (order_id, customer_id, order_date, order_status, order_total, source_file, source_row)
FROM (
  SELECT $1, $2, $3,                     -- $3 parsed as DD/MM/YYYY by the file format
         UPPER($4),                      -- normalise status at the door
         $5,                             -- converted to NUMBER(10,2) by the column type
         METADATA$FILENAME, METADATA$FILE_ROW_NUMBER   -- lineage for every row
  FROM @retail.raw.landing/2026/10/01/
)
FILE_FORMAT = (FORMAT_NAME = retail.raw.csv_orders);`,
    },
    {
      id: 'typed-rows',
      kind: 'table',
      label: 'RAW.ORDERS',
      headers: ['ORDER_ID', 'ORDER_DATE', 'ORDER_STATUS', 'ORDER_TOTAL', 'SOURCE_FILE', 'SOURCE_ROW'],
      values: [
        ['1001', '2026-10-01', 'SHIPPED', '89.50', 'orders_20261001.csv', '1'],
        ['1002', '2026-10-01', 'PENDING', '58.00', 'orders_20261001.csv', '2'],
        ['1003', '2026-10-01', 'SHIPPED', '74.90', 'orders_20261001.csv', '3'],
      ],
    },
  ],
  edges: [
    { source: 'csv-lines', target: 'copy-code', label: 'positions $1 … $5' },
    { source: 'copy-code', target: 'typed-rows', label: 'named, typed, traced' },
  ],
}
