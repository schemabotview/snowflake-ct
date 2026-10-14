import type { Section } from '../types'

export const offsetsRetention: Section = {
  id: 'offsets-retention',
  title: 'Stream offsets, retention and staleness',
  scene: 'offset-timeline',
  focus: 'versions',
  slide: `## A stream is a bookmark, not a copy

A stream records an **offset**: a point in the table's version history. Reading it returns every change **between the offset and now**.

### What it can return
- Offset at 08:00: events 101–104 are **available**
- \`SYSTEM$STREAM_HAS_DATA\` checks cheaply before running work
- The changes come from the table's own versions — no extra storage

### When history runs out
- Changes exist only within the table's **retention**
- For an unread stream, Snowflake extends retention up to \`MAX_DATA_EXTENSION_TIME_IN_DAYS\` — **14** by default
- Past \`STALE_AFTER\` the stream is **stale**: unreadable, and must be **recreated**

### Watch it
- Alert on \`STALE_AFTER\`, not on the first failed read`,
  narration:
    "A stream feels like a queue of changes, but it isn't one. What a stream actually stores is a single bookmark, called its offset: a point in the version history of the table it watches. When you read the stream, Snowflake compares the table at the offset with the table now, and returns the difference. Our stream was last consumed at eight in the morning. Since then, four events have landed in the change log, so reading the stream now returns events one oh one to one oh four. A cheap function, stream has data, tells you whether there is anything to process before you spend compute on it. Because a stream reads the table's own versions, it costs almost no storage. But that is also its limit. Old versions exist only within the table's data retention period. If a stream goes unread for longer than that, Snowflake will hold the history for it a little longer, up to the max data extension setting, which defaults to fourteen days. Beyond that point, shown as stale after in show streams, the stream becomes stale. A stale stream can no longer be read at all; it has to be recreated, and the changes it missed must be recovered some other way. So watch the stale after timestamp, and alert well before it, not when the first read fails.",
}
