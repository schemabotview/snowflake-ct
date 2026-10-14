import type { Section } from '../types'

export const replicationFailover: Section = {
  id: 'replication-failover',
  title: 'Replication, failover, RTO and RPO',
  scene: 'failover-plan',
  focus: 'objectives',
  slide: `## Failover is a plan, not a setting

A regional outage needs a **second account** in another Region, kept current by **replication**.

### Groups and editions
- A **replication group** copies databases to a **read-only** secondary — Standard edition and up
- A **failover group** can **promote** the secondary — **Business Critical** and up
- RETAILCO's \`PROD\` is **Enterprise**: it can replicate today, but **cannot fail over** yet

### Objectives
- **RPO**: with a 30-minute schedule, up to **60 minutes** of data can be lost
- **RTO** depends on everything around Snowflake: buckets, IAM, orchestrators, BI connections
- **Failback** is a second migration — plan it too

### Untested is unknown
- **Drill** the failover, end to end, on a schedule`,
  narration:
    "Recovering a dropped table is one thing. Recovering from a whole Region being unavailable is another, and it needs a second account in another Region, kept current by replication. Snowflake offers two kinds of group. A replication group copies databases, and other objects, to a secondary account on a schedule, and the secondary is always read-only. That is available from Standard edition. A failover group can also promote the secondary to become the primary, and Client Redirect lets one connection URL follow it, so clients reconnect without changing configuration. Failover groups need Business Critical edition. Here is an honest finding for our retailer. PROD was created on Enterprise in chapter one. It can replicate to a disaster recovery account today, but it cannot fail over until its edition changes. A business continuity plan has to start from facts like that. Then come the objectives. The recovery point objective is how much data you could lose. With a thirty-minute schedule, a secondary can be up to twice that behind, so up to an hour. The recovery time objective depends on far more than Snowflake: the landing bucket is still in the failed Region, the IAM trust must cover the new account, and the orchestrator and BI tools must point at the right place. Failback is a second migration. And a failover that has never been drilled is unknown.",
}
