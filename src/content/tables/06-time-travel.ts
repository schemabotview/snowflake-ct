import type { Section } from '../types'

export const timeTravel: Section = {
  id: 'time-travel',
  title: 'Time Travel, historical queries and UNDROP',
  scene: 'time-travel',
  focus: 'tt-code',
  slide: `## Reading the table as it was

Within the retention period, \`AT\` and \`BEFORE\` read a table at a **timestamp**, an **offset**, or just before a **statement**.

### Repairing a bad UPDATE
- Read first: \`BEFORE (STATEMENT => …)\` shows the state you want back
- **Clone** that past state, then \`SWAP\` it into place
- Anything written **after** the bad statement must be re-applied

### UNDROP
- \`UNDROP TABLE\` restores a dropped table within its retention period
- If a **new table with the same name** exists, rename it first
- Not available for **hybrid tables**

### The limit
- Past retention, only Snowflake's Fail-safe remains — **not** self-service`,
  narration:
    "Time Travel lets you read a table as it was in the past, as long as the moment is still within the table's retention period. You can ask for a timestamp, an offset such as twenty minutes ago, or, most precisely, the moment just before a particular statement ran. Here is why that matters. At five past two, someone ran an update on orders and forgot the where clause. Every order became cancelled, and by twenty past two, the revenue dashboard showed zero. The first step is to look, not to act. Querying the table before that update's statement ID shows the state we want back: four shipped, one pending, one cancelled. The second step is the repair. Clone the table as it was before the statement, then swap the clone into place, which exchanges the two tables in one operation. One caution: any legitimate changes written after the bad statement are not in the clone, so they have to be applied again. Time Travel also powers undrop. A table dropped by mistake can be restored within its retention period. If a new table with the same name was created in the meantime, rename that one first. Hybrid tables don't support undrop. And once retention has passed, only Fail-safe remains, which Snowflake performs for you on request. It is never a self-service query.",
}
