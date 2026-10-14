import type { Section } from '../types'

export const costSourcesSection: Section = {
  id: 'cost-sources',
  title: 'Serverless, refresh, maintenance, storage and transfer costs',
  scene: 'cost-sources',
  focus: 'ledger',
  slide: `## Every line on the bill has a driver

By chapter 8 the product spends credits in **many** places, not just two warehouses. Each line has a **driver** and a **view** that shows it.

### Compute
- Warehouses: **hours running × size** — including dynamic table refreshes
- Serverless: tasks, Snowpipe, clustering, data quality — each in its own **history view**
- Cloud services: billed only above **10%** of daily warehouse use

### Storage, in TB-months
- Active data, plus **Time Travel** and **Fail-safe** — both grow with **churn**

### Transfer
- Moving data to another **Region or cloud** is billed separately

### Read the ledger
- Here clustering (180) rivals a warehouse: a maintenance cost is easy to miss`,
  narration:
    "By this point in the course, our product spends credits in many more places than the two warehouses we started with. Each line on the bill has a driver, the thing that makes it grow, and a view that shows it. Warehouses are billed for the hours they run multiplied by their size, and that includes dynamic table refreshes, which run on the warehouse you named. Serverless features are each metered separately: tasks, Snowpipe, automatic clustering, data quality measurements, each with its own history view. Cloud services, as we saw in chapter one, only appear on days they exceed ten percent of warehouse usage. Storage is billed separately, by average terabytes per month, and it includes more than live data. Time Travel and Fail-safe hold the old versions of changed rows, so a table that is rewritten every night can carry far more history than its own size. And moving data out to another Region or cloud is charged as data transfer. Now read the illustrative October ledger. Most of it is what you would expect. But look at automatic clustering: one hundred and eighty credits, more than the load warehouse, and nearly as much as dashboards. Nobody runs it; it simply happens in the background. Maintenance costs like that are exactly the ones that are easy to miss.",
}
