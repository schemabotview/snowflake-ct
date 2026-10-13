import type { Section } from '../types'

export const warehousesSessions: Section = {
  id: 'warehouses-sessions',
  title: 'Warehouses, sessions and isolation',
  scene: 'session-context',
  focus: 'session',
  slide: `## A session decides who, where and on what

Every connection opens a **session**. Its context — **role, warehouse, database, schema** — decides how each statement runs.

### Session context
- The **role** decides which privileges apply
- The **warehouse** decides which compute executes the query
- The **database and schema** resolve unqualified names like \`orders\`
- Unset context falls back to the user's **defaults**, which differ per user

### A warehouse is compute, not a database
- It stores no tables; it reads and writes the shared storage layer
- Separate warehouses **isolate** workloads: a heavy load cannot queue the dashboards
- Size, auto-suspend and auto-resume are set **per warehouse**`,
  narration:
    "When you connect to Snowflake, you open a session, and that session carries context. There are four pieces worth watching. The current role decides which privileges apply, so the same statement can succeed for one role and be denied for another. The current warehouse decides which compute will execute your query. And the current database and schema decide how a short name like orders is resolved into a full table name. Anything you don't set explicitly falls back to the user's defaults, which can differ from one user to the next, so the same script can behave differently for two people. The word warehouse trips up many newcomers, because in most of the industry a data warehouse is where data lives. In Snowflake, a virtual warehouse is only compute. It stores no tables at all. It reads and writes the shared storage layer, and when it is suspended, your data is exactly where it was. That separation is what gives you workload isolation. Our retailer runs a small warehouse for dashboards and a medium one for the nightly load. Both read the same tables, but because they are separate compute, a heavy load cannot make the finance dashboard wait behind it. Each warehouse has its own size and its own auto-suspend and auto-resume settings, which, as we'll see shortly, is also where most compute cost is decided.",
}
