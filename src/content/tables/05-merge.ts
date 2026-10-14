import type { Section } from '../types'

export const merge: Section = {
  id: 'merge',
  title: 'MERGE, source deduplication and deterministic outcomes',
  scene: 'merge-dedup',
  focus: 'merge-code',
  slide: `## One source row per target row

\`MERGE\` updates rows that match and inserts rows that don't. It is only well defined when each target row matches **at most one** source row.

### What goes wrong
- Customer C-207 moved twice today: **two** update rows
- Which city wins? By default, MERGE **refuses** to guess and errors
- Disabling that check picks an **arbitrary** row

### Make it deterministic
- Reduce the source to **one row per key** before matching
- \`QUALIFY ROW_NUMBER() … = 1\` keeps the latest by \`UPDATED_AT\`
- If two rows tie on \`UPDATED_AT\`, add a **tie-breaker** column
- MERGE is one statement: its changes apply **all or nothing**

### Check the result
- C-207 → York, C-388 inserted, C-150 untouched`,
  narration:
    "Merge is how most incremental loads apply changes. It matches source rows to target rows on a key, updates the ones that match, and inserts the ones that don't. But merge is only well defined when each target row matches at most one source row. Today's customer updates contain two rows for customer C two oh seven, who moved to Leeds in the morning and to York before lunch. Both rows match the same target row. Which city should win? By default, Snowflake refuses to guess, and the merge fails with a duplicate row error. There is a parameter that turns this check off, and then Snowflake picks one of the duplicates, with no promise about which. That is a silent, random data error, so don't reach for it. The real fix is to give merge exactly one source row per key. Here, qualify with row number, partitioned by customer and ordered by the update time, newest first, keeps only the latest change for each customer. One more detail: if two updates could share the same timestamp, the ordering itself is ambiguous, so add a tie-breaker, such as a sequence number from the source. And because merge is a single statement, its updates and inserts apply together or not at all. Then check the outcome. C two oh seven now lives in York. C three eight eight is new, so it is inserted. And C one fifty, with no update, is untouched.",
}
