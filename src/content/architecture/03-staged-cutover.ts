import type { Section } from '../types'

export const stagedCutoverSection: Section = {
  id: 'staged-cutover',
  title: 'Migration, staged cutover, reconciliation and rollback boundaries',
  scene: 'staged-cutover',
  focus: 'evidence',
  slide: `## Cut over in stages, with evidence

Finance still reads revenue from **LEGACY_DW**. Moving it is a migration: staged, measured, and reversible for as long as possible.

### The stages
- **Parallel run**: both systems build revenue for 14 days
- **Reconcile** every store-day; a difference must be **explained**
- Move **one consumer at a time**: finance, then the partner
- **Retire** the legacy path only after 30 quiet days

### Acceptance is evidence
- Agreed **before** the run: counts, totals, freshness, policies
- A reconciliation query that **expects no rows**

### Rollback boundaries
- While the legacy path **still loads**, rollback is a switch
- Once it stops, the only way is **fix forward**`,
  narration:
    "Before Snowflake, finance read revenue from an older on-premises warehouse, which we'll call legacy D W. Moving finance across is a migration, and migrations fail when they happen all at once. So this one is staged. First, a parallel run: for fourteen days both systems build revenue from the same inputs. Second, reconcile every store and every day. A difference is not automatically a bug in the new system, but every one must be explained. For example, the legacy warehouse never netted refunds, so it is compared against the first version of the revenue view, not the second. Third, move consumers one at a time: finance's dashboard first, then the partner's export, which the share replaces. Only after thirty quiet days is the legacy path retired. Acceptance is evidence, agreed before the parallel run starts: equal row counts, totals within a penny, freshness within thirty minutes, and the policy matrix passing. The figures on screen are illustrative. The reconciliation query is written to return no rows when everything matches. And know where rollback stops being cheap. While the legacy warehouse is still loading, rolling back is just pointing consumers back. Once it stops loading, there is nothing current to go back to, and the only way is forward.",
}
