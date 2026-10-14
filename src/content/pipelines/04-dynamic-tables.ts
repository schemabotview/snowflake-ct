import type { Section } from '../types'

export const dynamicTables: Section = {
  id: 'dynamic-tables',
  title: 'Dynamic tables and target lag',
  scene: 'dynamic-lag',
  focus: 'dt-chain',
  slide: `## Declare the result and how fresh it must be

A **dynamic table** is defined by a query. Snowflake keeps its contents up to date, and works out the **dependencies** between dynamic tables itself.

### Target lag
- \`REVENUE_DT\` has a lag of **15 minutes**: the goal for how stale it may be
- \`ORDERS_CLEAN\` uses \`DOWNSTREAM\`: it refreshes when \`REVENUE_DT\` needs it
- The minimum is **1 minute**, and no table can be fresher than its upstream
- 09:24's refresh took 19 minutes: actual lag **22 minutes**, target missed

### What it is not
- Target lag is a **goal**, not a guarantee — slow refreshes make data older
- At least one table in a chain needs a **time-based** lag
- Refreshes run on the **warehouse** you name, and you pay for them`,
  narration:
    "Tasks describe how to do the work, step by step. Dynamic tables take the opposite approach: you declare the result you want, and how fresh it must be, and Snowflake works out the rest. A dynamic table is defined by a query. Our pipeline has two. Orders clean deduplicates the raw orders, using the same qualify pattern as before. Revenue DT aggregates the cleaned orders into daily revenue by store. Snowflake reads the queries, sees that revenue DT depends on orders clean, and schedules refreshes in the right order without you writing a single after clause. The freshness requirement is called target lag. Revenue DT has a target lag of fifteen minutes, meaning its contents should never be more than fifteen minutes behind its sources. Orders clean uses downstream, which means it has no clock of its own and refreshes whenever revenue DT needs it. That is why at least one table in a chain must have a time-based lag. The minimum lag is one minute, and a table can't be fresher than the tables it reads. Be precise about what this promises. Target lag is a goal Snowflake schedules towards. Look at the refresh history: the twenty-four past nine refresh took nineteen minutes, so for a while the dashboard's data was twenty-two minutes old, missing the target. And every refresh runs on the warehouse you named, so freshness has a cost.",
}
