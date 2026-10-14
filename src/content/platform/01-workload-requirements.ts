import type { Section } from '../types'

export const workloadRequirements: Section = {
  id: 'workload-requirements',
  title: 'Analytical workload requirements',
  scene: 'workload-requirements',
  focus: 'requirements',
  slide: `## Start with the consumers

A retailer's orders, customer updates and reference data become one **analytical data product**. Before choosing any feature, ask who reads it and what they need.

### Four requirements shape every later choice
- **Freshness** — a finance dashboard can wait a day; an order-status screen cannot
- **Correctness** — one row per order, revenue defined once, totals that reconcile
- **Cost** — compute while queries run, storage for what is kept, serverless for automation
- **Ownership** — who defines "revenue", and who answers when it is wrong

### Why this comes first
- The same data serves consumers with **different** requirements
- No single loading or layering pattern is right for all of them
- Every chapter returns to these four when it compares alternatives`,
  narration:
    "Before we look at a single Snowflake feature, let's look at the problem it is meant to solve. Throughout this course we follow one retailer. Orders arrive from an application database, customer details change in a CRM, and a small set of reference data describes products and stores. Our job is to turn those into a trusted analytical data product: clean order details, plus business summaries built on top of them. The interesting part is that the people reading it do not want the same thing. The finance team looks at yesterday's revenue each morning, so a daily refresh is fine, but the numbers must reconcile to the cent. A customer-facing app wants order status within minutes. Analysts want to ask questions nobody planned for. So we carry four requirements with us. Freshness: how stale is acceptable, and for whom. Correctness: what one row means, and how totals are defined. Cost: what we pay for compute, for storage, and for automation that runs on its own. And ownership: who decides what revenue means, and who answers when it is wrong. Every later choice, from how we load data to how we schedule it, is a trade between these four.",
}
