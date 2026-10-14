import type { Section } from '../types'

export const caches: Section = {
  id: 'caches',
  title: 'Result and warehouse caches, and fair comparisons',
  scene: 'cache-measurement',
  focus: 'runs',
  slide: `## Three runs, three different measurements

Run the same query three times and you can measure **three different things** — only one of them is the query's real cost.

### The two caches
- **Result cache**: an identical query on unchanged data returns the stored result — **no warehouse** at all
- Results are kept **24 hours**, extended on reuse, up to **31 days**
- **Warehouse cache**: data read recently sits on the warehouse's **local disk** — lost when it **suspends**
- Queries on **hybrid tables** never use the result cache

### Measuring fairly
- Turn off result reuse: \`USE_CACHED_RESULT = FALSE\`
- Compare **warm medians** on the same warehouse, several runs each
- Record **bytes and partitions scanned**, not just seconds`,
  narration:
    "Before claiming that a rewrite made a query faster, you have to be sure what you measured. Run the pruned query three times and you get three very different numbers. The first run, on a freshly resumed warehouse, takes one point one seconds and reads about one and a half gigabytes from remote storage. The second run, with exactly the same text, takes less than a tenth of a second and scans nothing at all. That is the result cache. When an identical query runs against data that hasn't changed, Snowflake returns the stored result without using a warehouse. Results are kept for twenty-four hours, and each reuse extends that, up to thirty-one days from the first run. The third run turns result reuse off for the session. It scans the same bytes, but takes only point six of a second, because the data is still on the warehouse's local disk from the first run. That warehouse cache belongs to one warehouse only, and it disappears when the warehouse suspends, so an aggressive auto-suspend trades cache warmth for credits. So, to compare two versions of a query fairly, disable result reuse, run each several times on the same warehouse, compare the warm medians, and record bytes and partitions scanned, which don't depend on caching at all. One exception to remember: queries on hybrid tables never use the result cache.",
}
