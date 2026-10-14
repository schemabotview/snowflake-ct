import type { Section } from '../types'

export const productRequirementsSection: Section = {
  id: 'product-requirements',
  title: 'Consumer requirements, freshness, contracts and ownership',
  scene: 'product-requirements',
  focus: 'reqs',
  slide: `## Consumers first, tables second

A data product is defined by **who reads it** and what they were promised — the tables follow from that.

### Four consumers, four promises
- **Finance**: revenue ≤ **30 minutes** old, 07:00–19:00
- **Store managers**: their own store's orders, ready **by 07:00**
- **York partner**: daily figures through a **versioned** share
- **Data science**: history, customers **as they were**

### Turning wishes into requirements
- Freshness is a **number and a window**, not "live"
- The strictest consumer must not set **every** table's schedule

### Ownership, stated once
- An **owner** runs and fixes it; a **steward** owns the definitions
- **Consumers** agree the contract; changing it is **negotiated**, not announced`,
  narration:
    "Everything in this course has been a part. In this final chapter we put the parts together into one data product and ask whether the whole design holds up. A data product is defined by who reads it and what they were promised. The tables follow from that, not the other way round. Our retail product has four consumers. Finance wants revenue no more than thirty minutes old during trading hours. Store managers want their own store's orders, and only theirs, ready by seven in the morning. The York partner gets daily figures through a versioned share. And data science wants order history with customers as they were at the time, the type two dimension from chapter five. Notice how different those promises are. Turning them into requirements means making each one precise. Freshness is a number and a window, never just real time. And the strictest consumer must not dictate every table's schedule: finance's thirty minutes applies to revenue, not to reference data that changes once a month. Contracts and access are requirements too: the v2 definition, the store row policy, the masked email. Finally, ownership is written down once. The owner runs the product and fixes it when it breaks. The steward, here finance, owns what revenue means. Consumers agree the contract, and a change to it is negotiated with them, not announced to them.",
}
