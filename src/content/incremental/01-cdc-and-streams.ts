import type { Section } from '../types'

export const cdcAndStreams: Section = {
  id: 'cdc-and-streams',
  title: 'Source CDC versus Snowflake streams',
  scene: 'cdc-vs-stream',
  focus: 'compare',
  slide: `## Two different things called "changes"

Chapter 3 merged a daily extract. Now the CRM sends a **change feed**: every insert, update and delete, in order.

### Source change data capture
- A CDC tool reads the CRM's own log and **lands every event**
- \`RAW.CUSTOMER_CHANGES\` keeps them all, with a **source sequence**
- This table **is** the history — keep it

### A Snowflake stream
- Tracks changes to **one Snowflake table** since a bookmark, its **offset**
- Stores no data: it reads the table's versions, within **retention**
- Returns the **net** change, not every step

### The rule this chapter follows
- Land the source's events durably; use streams to find what is **new**`,
  narration:
    "In chapter three we merged a daily extract of customer updates. Now the CRM sends something richer: a change feed. Every insert, update and delete in the CRM is captured, in order, and delivered to Snowflake. It is worth being precise here, because two quite different things both get called changes. The first is source change data capture. A CDC tool reads the CRM's own transaction log and lands every event as a row in raw customer changes. On the second of October there were four: customer C two oh seven moved to Leeds, C three eight eight signed up in Bath, C two oh seven moved again to York, and C three one one was deleted. Each event carries the source's sequence number and the time it happened. This table is the history of our customers, so we keep it. The second is a Snowflake stream. A stream tracks changes to one Snowflake table since a bookmark called its offset. It stores no data of its own; it reads the table's versions, and only as far back as the table's retention allows. And it returns the net change, not every intermediate step. The rule for this chapter follows directly: land the source's events durably, and use streams only to find out what is new since the last time you looked.",
}
