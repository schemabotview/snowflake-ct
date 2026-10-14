import type { Section } from '../types'

export const constraints: Section = {
  id: 'constraints',
  title: 'Constraints: enforced versus informational',
  scene: 'constraint-enforcement',
  focus: 'outcomes',
  slide: `## Declared is not the same as enforced

On a **standard table**, Snowflake enforces \`NOT NULL\` and \`CHECK\`. **PRIMARY KEY, UNIQUE and FOREIGN KEY** are recorded but **not enforced**.

### What that means for ORDERS
- A second row for order 1001 **loads silently**
- A total of -5.00 **fails** the CHECK, and the whole statement with it
- Only **hybrid tables** enforce primary, unique and foreign keys

### Why declare keys at all
- They document the model for people and BI tools
- \`RELY\` tells the optimizer the key is true, enabling join elimination
- A \`RELY\` key that is **false** gives wrong answers, not errors

### Keep the promise yourself
- Deduplicate before loading, and **test** for duplicates after`,
  narration:
    "Snowflake lets you declare the usual constraints on a table, but on a standard table only some of them are enforced. Not null is enforced, and so is check, which tests a condition on each row. Primary key, unique and foreign key are recorded, visible to tools, and then not enforced at all. Let's see what that means for orders. We declare order ID as the primary key and add a check that the total is never negative. Now insert a second row for order one thousand and one. It loads without any complaint, because the primary key is informational. Insert an order with a total of minus five, and the check fails, taking the whole statement with it. If you need keys that are truly enforced, hybrid tables enforce them, and we'll meet those at the end of the chapter. So why declare keys on a standard table? They document the model for people and for BI tools. And with the rely property, you tell the optimizer that the key really holds, which lets it skip unnecessary joins. Use that carefully: a rely key that is false produces wrong answers, not errors. The practical rule is that you keep the promise yourself. Deduplicate before loading, and run a duplicate check afterwards, like the group by query at the bottom of the scene.",
}
