import type { Section } from '../types'

export const decisionRecordsSection: Section = {
  id: 'decision-records',
  title: 'Performance, governance, cost and recovery decision records',
  scene: 'decision-records',
  focus: 'adr',
  slide: `## Write down why

A design is a series of choices. A **decision record** keeps each one with its reason, so it can be **checked** and **revisited**.

### One record, five parts
- The **requirement**, and whose it is
- The **decision**, and the **alternatives rejected** — with reasons
- The **evidence**: a query or a measurement, not an opinion
- What would make you **revisit** it
- A changed decision gets a **new** record that **supersedes** it

### The course's own log
- **Performance**: range predicate, not a clustering key
- **Governance**: one row policy, not a view per store
- **Cost**: a monitor capping \`BI_WH\` at 400 credits a month
- **Recovery**: replicate now; failover needs **Business Critical**`,
  narration:
    "A design is really a series of choices, and choices are forgotten faster than code. A decision record keeps each one with its reason. A good record has five parts. The requirement, and whose it is. The decision. The alternatives that were rejected, with the reason for each, because the rejected options are exactly what the next engineer will propose. The evidence, which should be a query or a measurement, not an opinion. And the condition that would make you revisit it. When a decision changes, you don't edit the old record; you write a new one that supersedes it, so the history of reasoning survives. ADR four chose a nightly rebuild for orders; when finance asked for thirty-minute revenue, ADR eleven superseded it. Here is the record for finance's freshness. The requirement is revenue at most thirty minutes old during trading hours. The decision is a dynamic table with a fifteen-minute target lag. An hourly rebuild was rejected because it could be an hour old and rescans history. Streams and tasks were rejected because they give the same freshness with more code to own. The evidence is the refresh history from chapter seven. And it will be revisited if finance needs under five minutes, or if the monthly budget comes under pressure. The course has already made several decisions like this. In performance, a range predicate instead of a clustering key, from chapter eight. In governance, one row policy rather than a view per store. In cost, a resource monitor. In recovery, replication now, with failover waiting on an edition change.",
}
