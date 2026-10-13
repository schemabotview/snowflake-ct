import type { Section } from '../types'

export const costAndLifecycle: Section = {
  id: 'cost-and-lifecycle',
  title: 'Cost awareness and resource lifecycle',
  scene: 'cost-ledger',
  focus: 'ledger',
  slide: `## Know what is billed, and why

Write the assumptions down first: **warehouse size, hours, days, data volume**. Then the cost is arithmetic you can check.

### What is billed
- **Warehouses**: credits per hour by size, billed **per second** after a 60-second minimum on each start
- **Cloud services**: billed only where they exceed 10% of that day's warehouse use
- **Serverless** features such as Snowpipe: metered separately, by their own usage
- **Storage**: average bytes on disk per month, including retained history

### Suspend is not delete
- A **suspended** warehouse uses no credits; its tables are untouched
- **Dropping** a warehouse deletes compute, not data
- Credit prices vary by contract and Region: check before quoting money`,
  narration:
    "Cost in Snowflake is easier to reason about once you split it into kinds. The biggest is usually warehouse compute. A warehouse consumes credits per hour according to its size, and each size step roughly doubles the rate. A small standard warehouse uses two credits an hour, a medium uses four. Billing is per second, but every time a warehouse starts or resumes, you pay for at least one minute. Cloud services, the layer that plans queries and checks privileges, is only billed on days when it exceeds ten percent of your warehouse usage. Serverless features, such as Snowpipe or serverless tasks, are metered separately, because Snowflake supplies their compute rather than one of your warehouses. And storage is billed on the average amount kept on disk across the month, including history kept for recovery. So the habit is to write the assumptions down. Our dashboard warehouse is small, runs about six hours on twenty-two working days: two hundred and sixty-four credits. The nightly load is medium for half an hour every day: sixty credits. Those are estimates you can check later against real usage. Finally, separate lifecycle from data. A suspended warehouse costs nothing and loses only its cache. Even dropping a warehouse deletes compute, never a table.",
}
