import type { Section } from '../types'

export const listingsDistribution: Section = {
  id: 'listings-distribution',
  title: 'Listings, reader accounts and cross-Region distribution',
  scene: 'distribution-options',
  focus: 'options',
  slide: `## Reaching consumers elsewhere

The right mechanism depends on **where** the consumer is and **whether** they have a Snowflake account. Each moves cost to someone different.

### The options
- **Direct share**: same Region; nothing copied
- **Listing with auto-fulfillment**: Snowflake keeps a refreshed copy in the consumer's Region — the **provider** pays transfer and storage, only where consumers exist
- **Replication** then share: the same result, managed by you — enabled first by an **organisation administrator**
- **Reader account**: for a consumer with no Snowflake account — the **provider** pays their compute too

### The EU partner
- Azure West Europe needs a **listing**: the copy lives in the EU
- The copy refreshes on a **schedule**: its freshness is the refresh interval
- Ask first: may this data **leave** its Region at all?`,
  narration:
    "A direct share only works within one Region. Our second franchise partner runs on Azure in West Europe, so we need another mechanism, and each option moves cost and control somewhere different. For a consumer in the same Region with a Snowflake account, a direct share is simplest and copies nothing. For a consumer in another Region or cloud, a listing with auto-fulfillment is the usual route. Snowflake keeps a refreshed copy of the data product in the consumer's Region, and the provider pays for the replication, the storage, and the data transfer, but only in Regions where consumers actually exist. You can achieve the same by replicating the database yourself and sharing from a replica, which gives more control and more work, and needs an organisation administrator to enable replication first. And for a consumer with no Snowflake account at all, a provider can create a reader account, owning it and paying for its compute as well as the storage. So the EU partner gets a private listing, fulfilled into West Europe. That raises three questions before anyone clicks publish. First, residency: is this data allowed to leave the United States at all? Second, freshness: the EU copy is refreshed on an interval, so it is not live. And third, cost: replication and transfer now appear on our bill. Distribution is a governance decision, not just a technical one.",
}
