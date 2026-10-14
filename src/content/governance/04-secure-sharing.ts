import type { Section } from '../types'

export const secureSharing: Section = {
  id: 'secure-sharing',
  title: 'Shares, providers and consumers',
  scene: 'share-flow',
  focus: 'consumer',
  slide: `## Shared, not copied

A **share** lets another Snowflake account query your objects **live**, without copying them. RETAILCO shares York revenue with its York franchise partner.

### How it is built
- Share a **secure view** through a **database role** (chapter 2), not raw tables
- The consumer creates a database from the share, **read-only**
- They grant the database role to **their own** roles

### Who is responsible for what
- **Provider**: storage, correctness, freshness, which rows are exposed
- **Consumer**: compute to query it, and who in their organisation sees it
- Policies travel with the data; role checks need **database roles** across a share

### Same Region only
- A direct share reaches accounts in the **same Region** — next section goes further`,
  narration:
    "Sometimes the consumer isn't in your company at all. Our retailer's York store is run by a franchise partner, YorkCo, who has their own Snowflake account and needs daily revenue for their store. Rather than emailing files, RETAILCO shares it. A share lets another account query your objects live, with no copy made. Here is how it is built. We don't share the raw orders table. We share the partner revenue secure view from chapter five, which already restricts to store S zero two, and we grant it through a database role, partner read, which is granted to the share. On the other side, YorkCo creates a database from the share. It is read-only, and they grant the shared database role to whichever of their own roles should see it. Responsibilities divide cleanly. The provider pays for storage and owns correctness, freshness, and exactly which rows are exposed. The consumer pays for the compute to query it, using their own warehouse, and decides who in their organisation sees it. Masking and row policies travel with the data, but checks on the provider's role names don't mean anything in another account, so policies on shared data should test for database roles instead. One limit leads into the next section: a direct share only reaches accounts in the same Region.",
}
