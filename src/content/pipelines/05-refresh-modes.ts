import type { Section } from '../types'

export const refreshModesSection: Section = {
  id: 'refresh-modes',
  title: 'Refresh modes, initialisation and reinitialisation',
  scene: 'refresh-modes',
  focus: 'modes',
  slide: `## Incremental or full, decided once

A refresh can be **incremental** — process only changed rows — or **full** — recompute everything. The query decides which is possible.

### How the mode is chosen
- \`AUTO\` is resolved **once, at creation**, then fixed
- A query with \`RANDOM()\`, \`ROLLUP\` or \`EXCEPT\` makes \`AUTO\` pick **FULL** quietly
- \`INCREMENTAL\` set explicitly **fails** at CREATE instead — the safer choice in production
- \`refresh_mode_reason\` records **why** AUTO chose FULL

### First fill, and starting over
- \`INITIALIZE = ON_CREATE\` fills it during CREATE; \`ON_SCHEDULE\` leaves it empty until the first refresh
- \`ALTER\`ing lag or warehouse keeps the data
- \`CREATE OR REPLACE\` **reinitializes** — a full recompute
- Changing the refresh mode itself **requires** \`CREATE OR REPLACE\``,
  narration:
    "Every dynamic table refresh is either incremental, processing only the rows that changed since last time, or full, recomputing the whole result. Incremental is usually far cheaper, but it is only possible when Snowflake can work out how the query's output changes as its input changes. The refresh mode is set when you create the table. Auto lets Snowflake decide, and here is the subtle part: it decides once, at creation, and the choice is then fixed. If the query contains something incremental refresh can't handle, such as random, rollup or cube, except, or a recursive query, auto quietly resolves to full, and every refresh recomputes everything. The refresh mode reason column tells you why. If you set incremental explicitly, Snowflake refuses to create the table instead, which is why explicit modes are the safer choice in production: a surprise becomes an error, not a bill. Two more lifecycle details matter. Initialize on create fills the table during the create statement; on schedule leaves it empty, and unreadable, until the first scheduled refresh. And changes behave differently. Altering the target lag or the warehouse keeps the existing data. But create or replace always reinitializes the table, recomputing it from scratch, even if the definition didn't change.",
}
