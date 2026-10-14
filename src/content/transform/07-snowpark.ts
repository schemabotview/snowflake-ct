import type { Section } from '../types'

export const snowpark: Section = {
  id: 'snowpark',
  title: 'Snowpark DataFrames, pushdown and actions',
  scene: 'snowpark-actions',
  focus: 'movement',
  slide: `## Lazy plans, explicit actions

**Snowpark** lets Python build transformations as DataFrames. They are **lazy**: each step adds to a plan, and nothing runs until an **action**.

### Where the work happens
- \`filter\`, \`group_by\`, \`agg\` build a plan on the client
- An action turns the plan into SQL that runs in a **warehouse** — pushdown
- Same result as the equivalent SQL

### Actions decide what moves
- \`save_as_table\` writes in Snowflake: **no data** leaves
- \`count\` returns **one number**
- \`collect\` and \`to_pandas\` bring rows to **client memory**

### The boundary to respect
- Reduce first, then collect — never pull a whole table to aggregate it locally
- \`to_pandas_batches()\` streams a large result in **chunks** when you must`,
  narration:
    "Not every transformation is written in SQL. Snowpark lets Python developers build the same transformations as DataFrames. The key idea is that a Snowpark DataFrame is lazy. Reading the orders table gives you a reference, not data. Each filter, group by and aggregate adds a step to a plan held on the client. Nothing has run yet. Only an action turns the plan into SQL, sends it to Snowflake, and runs it on a warehouse. That is pushdown: the computation happens where the data lives, exactly as if you had written the SQL yourself. Which action you call decides how much data travels. Save as table runs the query and writes the result inside Snowflake, so no rows leave at all. Count runs the query and returns a single number. Collect returns every result row to the client, which is fine for a small aggregate. To pandas returns every row too, into the client's memory, and called on a whole table, it drags all of it across the network into one machine. The boundary to respect is simple. Let Snowflake reduce the data first, with filters and aggregates, and only then bring a small result back. Pulling a large table into Python to aggregate it there defeats the point of the platform. When you genuinely need many rows locally, to pandas batches streams them in chunks rather than all at once.",
}
