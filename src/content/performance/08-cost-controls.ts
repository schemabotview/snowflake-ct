import type { Section } from '../types'

export const costControlsSection: Section = {
  id: 'cost-controls',
  title: 'Resource monitors, budgets and attribution',
  scene: 'cost-controls',
  focus: 'coverage',
  slide: `## Which control sees which credits

### Resource monitors
- Watch **warehouses** — and the cloud services that support them
- Can **notify** and **suspend** at a credit quota
- **Blind to serverless** spend: tasks, clustering, Snowpipe

### Budgets
- Cover the account, or a **custom group** of objects including their serverless spend
- A monthly limit that **notifies** on a projected overrun — they do **not** stop anything
- Actions can lag by **hours**

### Attribution
- **Tag** warehouses and tables with a cost centre, then group spend by tag

### The gap
- Usage views run **hours behind**: today's surprise shows up tomorrow`,
  narration:
    "Knowing where credits go is half the job; the other half is keeping them under control, and here the coverage of each tool matters a great deal. A resource monitor watches warehouses. You give it a credit quota, and triggers that notify at, say, eighty percent and suspend the warehouse at one hundred. It also counts the cloud services that support those warehouses. But it is blind to serverless spend. Tasks on serverless compute, automatic clustering and Snowpipe never touch a resource monitor, so the one hundred and eighty credits of clustering from the last section would sail straight past it. Budgets fill that gap. An account budget covers everything, and a custom budget covers a chosen group of objects, including all of their serverless and background costs. A budget has a monthly limit in credits and notifies when spend is projected to exceed it. What it does not do is stop anything. It can call a procedure if you write one, and those actions can lag by hours. Attribution answers the question of whose spend it is: tag warehouses and tables with a cost centre, and group usage by tag. Finally, remember the latency. The account usage views run hours behind, so today's surprise usually appears tomorrow. Controls limit the damage; they do not replace someone looking.",
}
