import type { Scene } from '@graphlearning/flow'

// §2 — a stream is a bookmark into the table's versions. What it can return depends on that
// bookmark still being inside retention; past it, the stream is stale.
export const offsetTimeline: Scene = {
  id: 'offset-timeline',
  title: 'A stream is a bookmark, not a copy',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'versions',
      label: 'Table versions, 2 October',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'v-0800', label: '08:00', sub: 'last consumed', pattern: 'service', icon: 'circlecheck' },
        { id: 'v-0900', label: '09:05', sub: '+ event 101', pattern: 'storage', icon: 'table' },
        { id: 'v-1015', label: '10:20', sub: '+ event 102', pattern: 'storage', icon: 'table' },
        { id: 'v-1130', label: '11:35', sub: '+ event 103', pattern: 'storage', icon: 'table' },
        { id: 'v-1200', label: '12:05', sub: '+ event 104', pattern: 'storage', icon: 'table' },
      ],
      edges: [
        { source: 'v-0800', target: 'v-0900', label: 'offset' },
        { source: 'v-0900', target: 'v-1015' },
        { source: 'v-1015', target: 'v-1130' },
        { source: 'v-1130', target: 'v-1200' },
      ],
    },
    {
      id: 'offset-detail',
      label: 'Reading it, and its limit',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'stream-code',
          kind: 'code',
          filename: 'stream.sql',
          label: `CREATE STREAM retail.raw.customer_changes_s
  ON TABLE retail.raw.customer_changes
  APPEND_ONLY = TRUE;                        -- the log only ever gets inserts (§4)

SELECT SYSTEM$STREAM_HAS_DATA('retail.raw.customer_changes_s');   -- TRUE: 4 new rows
SHOW STREAMS LIKE 'customer_changes_s';    -- stale, stale_after`,
        },
        {
          id: 'staleness',
          label: 'When the bookmark falls out of history',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'st-retention', label: 'Retention', sub: 'the table keeps 1 day', pattern: 'storage', icon: 'history' },
            { id: 'st-extend', label: 'Extension', sub: 'held up to 14 days for an unread stream', pattern: 'service', icon: 'clock' },
            { id: 'st-stale', label: 'Stale', sub: 'unreadable: recreate it', pattern: 'warn', icon: 'ban' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'versions', target: 'offset-detail', label: 'returns 101–104' }],
}
