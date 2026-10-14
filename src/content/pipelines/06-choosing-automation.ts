import type { Section } from '../types'

export const choosingAutomation: Section = {
  id: 'choosing-automation',
  title: 'Dynamic tables versus streams, tasks and materialized views',
  scene: 'choose-automation',
  focus: 'compare',
  slide: `## Choose by what the logic needs

### Dynamic tables
- You state the **result**; Snowflake manages dependencies and refreshes
- Joins and aggregates welcome; **no side effects**, no procedural steps

### Streams and tasks
- You write the **change logic**: guards, deletes, any order of steps
- More control, more code — and **idempotency** is your job
- Ch. 6's rule can be a dynamic table **if** it fits in a query

### The retail product's choices
- **Revenue**: a dynamic table — a pure aggregate with a freshness goal
- **Customers**: stream + task — the sequence-guarded MERGE from chapter 6
- **Day reload**: a task calling a **procedure** — it has steps and side effects`,
  narration:
    "We now have three ways to keep a result current, and none of them is always right. The question is what the logic needs. A dynamic table is declarative. You state the result as a query, joins and aggregates included, and Snowflake manages dependencies and refreshes against a freshness goal. What it can't do is anything procedural: no side effects, no calling procedures, no sending notifications, and any special apply rules have to be expressible as a query. Streams and tasks are the opposite. You write the change logic yourself, so you can do anything: sequence guards, tombstones, several steps in a specific order. That control costs more code, and making every step safe to re-run is your job. Materialized views sit to one side: one table, no joins, kept current by Snowflake on serverless compute, best for a hot aggregate over a single large table. So here is how our retailer chooses. Daily revenue is a pure aggregate with a freshness requirement, which is exactly what a dynamic table expresses. Customers come from a change feed with out-of-order events and deletes, so the guarded merge from chapter six, run by a stream-triggered task, is the better fit. In fairness, that particular rule, latest event wins and tombstones drop out, can also be written as a query, so it could be a dynamic table too; the merge earns its place when the apply logic grows beyond what one query can say. And the day reload has steps and side effects, so a task calls a procedure. Choose by the logic, not the feature.",
}
