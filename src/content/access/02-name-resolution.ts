import type { Section } from '../types'

export const nameResolution: Section = {
  id: 'name-resolution',
  title: 'Session context, identifiers and case rules',
  scene: 'name-resolution',
  focus: 'session-raw',
  slide: `## A short name is resolved, not looked up

An unqualified name like \`orders\` is resolved against the session's **current database and schema**. Change the context and the same text names a different table.

### The failure to recognise
- In \`RETAIL.SALES\`, \`COUNT(*)\` returns **6** cleaned orders
- In \`RETAIL.RAW\`, it returns **9** landed rows, duplicates included
- Neither session gets an error — one gets a **wrong answer**

### Case rules
- Unquoted identifiers are stored and matched in **upper case**
- Double-quoted identifiers keep their case **exactly**
- \`"Orders"\` and \`ORDERS\` can be two separate objects

### The habit
- Fully qualify names in anything that runs unattended`,
  narration:
    "When you write a short name like orders, Snowflake does not search the whole account for it. It resolves the name against the session's current database and schema. That makes the name only as reliable as the context it runs in. Here is the same statement, counting orders, run in two sessions. The first session is using the sales schema, so orders means the cleaned table, and the answer is six, one row per order. The second session happens to be using the raw schema, perhaps because its user's default was set that way, or because an earlier script changed it. Now orders means the landed table, which still contains three duplicate deliveries, and the answer is nine. Neither session sees an error. One of them simply gets a wrong number, and that is far harder to notice than a failure. Case adds a second trap. Unquoted identifiers are stored and matched in upper case, so orders, Orders and quoted upper-case ORDERS all reach the same table. A double-quoted identifier keeps its exact case, so quoted Orders with a capital O is a different object altogether. The habit that avoids both traps is simple: fully qualify the names in anything that runs without a person watching.",
}
