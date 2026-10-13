import type { Section } from '../types'

export const firstQuery: Section = {
  id: 'first-query',
  title: 'Snowsight, clients and a first query',
  scene: 'first-query',
  focus: 'query',
  slide: `## A first query, read line by line

**Snowsight** is the browser interface; the **Snowflake CLI**, drivers and connectors send the same SQL from code. Each needs a session.

### What the query does
- \`USE ROLE\` and \`USE WAREHOUSE\` set the context explicitly
- \`retail.sales.orders\` is **fully qualified**: database, schema, table
- \`WHERE\` keeps 5 of 6 rows; \`GROUP BY\` returns **one row per status**
- \`ORDER BY\` fixes the row order — without it, order is **not guaranteed**
- Every run gets a **query ID** — the handle for its history and profile later

### Check the result, do not just accept it
- SHIPPED: 89.50 + 74.90 + 48.00 = **212.40**
- Unquoted names come back in **upper case**
- The grain of the result is the grain of the \`GROUP BY\``,
  narration:
    "Let's run a first query. In Snowsight, the browser interface, you would type it into a worksheet. From code, the Snowflake CLI, a driver, or a connector sends exactly the same SQL; each simply opens a session first. The first two lines set that session's context explicitly. We use the analyst role, so that role's privileges apply, and the B I warehouse, so that warehouse's compute does the work. Then comes the query. Notice that the table is named in full: the retail database, the sales schema, the orders table. A fully qualified name doesn't depend on whatever database and schema the session happens to be using, which makes the query safe to copy into another worksheet or script. The where clause keeps the five orders from the first of October and drops the one from the second. Group by order status then collapses those five rows into one row per status, and we count orders and sum their totals. Finally, order by sorts by revenue. Without it, Snowflake makes no promise about row order, so never rely on the order you happened to see. Every run also gets a query ID, which is the handle we'll use later to find the query in history and open its profile. Don't just accept the result; check it. The three shipped orders add up to two hundred and twelve forty. Also notice the column names come back in upper case, because Snowflake stores unquoted identifiers that way. And the result has one row per status, because that is the grain we grouped by.",
}
