import type { Scene } from '@graphlearning/flow'

// §4 — what a standard stream on SALES.CUSTOMERS returns for the day's changes, against an
// append-only stream on the same table. C-207 went Hull → Leeds → York; the stream shows only the net.
export const streamOutput: Scene = {
  id: 'stream-output',
  title: 'Net changes, as DELETE and INSERT rows',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'standard',
      kind: 'table',
      label: 'Standard stream on SALES.CUSTOMERS — offset 08:00 to 12:15',
      headers: ['CUSTOMER_ID', 'CITY', 'METADATA$ACTION', 'METADATA$ISUPDATE'],
      values: [
        ['C-207', 'Hull', 'DELETE', 'TRUE'],
        ['C-207', 'York', 'INSERT', 'TRUE'],
        ['C-388', 'Bath', 'INSERT', 'FALSE'],
        ['C-311', 'Ripon', 'DELETE', 'FALSE'],
      ],
    },
    {
      id: 'readings',
      label: 'Reading it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'rd-update', label: 'An update', sub: 'old row out, new row in', pattern: 'service', icon: 'swap' },
        { id: 'rd-net', label: 'Leeds is gone', sub: 'only the net change', pattern: 'warn', icon: 'circleslash' },
        { id: 'rd-delete', label: 'A delete', sub: 'the old row, ISUPDATE FALSE', pattern: 'service', icon: 'trash' },
      ],
    },
    {
      id: 'modes',
      kind: 'table',
      label: 'Choosing the stream mode',
      headers: ['', 'Standard', 'Append-only'],
      values: [
        ['Returns', 'inserts, updates, deletes', 'inserts only'],
        ['Cost to read', 'joins old and new rows', 'cheaper'],
        ['Fits', 'SALES.CUSTOMERS (updated)', 'RAW.CUSTOMER_CHANGES (insert-only log)'],
      ],
    },
  ],
  edges: [
    { source: 'standard', target: 'readings' },
    { source: 'readings', target: 'modes', label: 'so choose by the table' },
  ],
}
