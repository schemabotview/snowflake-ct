import type { Section } from '../types'

export const physicalOptionsSection: Section = {
  id: 'physical-options',
  title: 'Clustering, search optimization and materialized results',
  scene: 'physical-options',
  focus: 'options',
  slide: `## Pay in the background, read faster

Some reads can be made cheaper by doing work **in advance**. Each option runs **serverless maintenance** you pay for continuously.

### Three options
- **Clustering key**: keeps rows ordered so range filters prune well
- **Search optimization**: finds a few rows in a huge table — point lookups; Enterprise+
- **Materialized view**: stores a repeated aggregate; one table, Enterprise+

### What they cost
- Maintenance grows with how much the table **changes**
- Clustering's billing model is moving to **Optima** for newly clustered tables

### Before enabling any of them
- **Rewrite** first — often enough on its own
- **Estimate** with the \`SYSTEM$ESTIMATE_…\` functions, then watch the history views`,
  narration:
    "Some workloads stay slow even after a good rewrite, and for those Snowflake offers ways to do work in advance, so that reads become cheaper. Each one runs serverless maintenance in the background, and you pay for it continuously, whether or not anyone queries. A clustering key asks Snowflake to keep a table's rows physically ordered by some columns, such as order date, so that range filters prune well even when data arrives out of order. Search optimization builds a structure that finds a handful of rows in a huge table, which is ideal for point lookups such as one order by its ID; it needs Enterprise edition and often adds storage of around a quarter of the table. A materialized view stores the result of a repeated aggregate over one table, again on Enterprise edition. The common thread is cost. Maintenance grows with how much the underlying table changes, so a table that is rewritten constantly can cost a lot to keep clustered or optimized. Snowflake is also changing how clustering is billed: newly clustered tables move to a model called Optima. So before enabling any of them, try a rewrite first, which is often enough and always free. Then estimate the cost with the system estimate functions, enable it, and watch its history views to confirm the estimate held.",
}
