import type { Section } from '../types'

export const pruning: Section = {
  id: 'pruning',
  title: 'Micro-partitions, pruning and scanned data',
  scene: 'pruning-scan',
  focus: 'two-queries',
  slide: `## Skip partitions before reading them

Every micro-partition records the **min and max** of each column. A filter on a column lets Snowflake skip any partition whose range cannot match — **pruning**.

### The same question, two ways
- \`TO_CHAR(order_date, 'YYYY-MM') = '2026-10'\`: the metadata can't answer it — **all 18,240** partitions read
- \`order_date >= '2026-10-01' AND < '2026-11-01'\`: only **312** partitions read
- Same result: **14.2 s → 1.1 s**, with no new compute

### What makes pruning work
- Compare the **column itself**, not an expression of it
- Data that **arrives in date order** keeps each partition's range narrow
- Select only the columns you need: storage is **columnar**
- The profile shows pruning as **partitions scanned** against **partitions total**`,
  narration:
    "So why did the scan read everything? To answer that, recall chapter one: Snowflake stores tables as micro-partitions, and for each one it records metadata, including the minimum and maximum value of every column. When a query filters on a column, Snowflake compares the filter with those ranges, and skips any partition that cannot possibly contain a match. That is called pruning, and it happens before any data is read. Now look at the slow query's filter. It turned the order date into text, year and month, and compared that with the string twenty twenty-six dash ten. The partition metadata holds dates, not that text, so Snowflake cannot use it, and every partition has to be read and tested. Rewrite the filter as a plain range on the date column itself, from the first of October up to, but not including, the first of November, and the metadata answers it directly. Only three hundred and twelve partitions can contain October dates, so only those are read. The result is identical, and the query drops from fourteen seconds to about one, without a single extra credit of compute. Pruning works best when you compare the column itself, when data arrives roughly in date order, so each partition covers a narrow range, and when you select only the columns you need.",
}
