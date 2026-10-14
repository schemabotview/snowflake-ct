import type { Section } from '../types'

export const schemaEvolution: Section = {
  id: 'schema-evolution',
  title: 'Schema evolution and incompatible changes',
  scene: 'schema-change',
  focus: 'changes',
  slide: `## Not every source change is evolution

With \`ENABLE_SCHEMA_EVOLUTION\` and \`MATCH_BY_COLUMN_NAME\`, a COPY or Snowpipe load can **add new columns** and **drop NOT NULL** on missing ones.

### Three October changes
- **Added** \`SALES_CHANNEL\`: the column appears — safe
- **Renamed** \`ORDER_TOTAL\`: a new column, and old totals go **NULL** — silent
- **Changed type** to \`"89.50 GBP"\`: conversion fails — loud

### What evolution will not do
- Widen or change a column's type, or understand a rename
- Run from \`INSERT\` or tasks — only COPY, Snowpipe and Streaming paths

### Treat the schema as a contract
- Watch evolution records, test NULL rates, agree changes with the source owner`,
  narration:
    "Sources change shape, usually without warning. Snowflake can absorb some of that automatically. Turn on schema evolution for a table, load with match by column name, and give the loading role the evolve schema privilege. Then a copy or Snowpipe load that finds a new column in the file adds it to the table, and a column missing from the file has its not null constraint dropped so the load can continue. In October, our source made three changes. First, it added a sales channel column. Schema evolution adds it, and that is genuinely safe. Second, it renamed order total to total amount. Evolution has no idea this is a rename. It adds a brand new total amount column and, because order total is now missing, drops its not null constraint. Every new order loads with a null order total, and revenue quietly falls. That is the dangerous one: it looks like success. Third, it started writing totals with a currency suffix. That cannot convert to a number, so the load rejects it loudly, which is actually the easier failure to deal with. Evolution won't change a column's type, won't recognise renames, and only applies to file and streaming loads, not to inserts or tasks. So treat the schema as a contract: watch the evolution records, test for sudden nulls, and agree changes with the source owner before they ship.",
}
