import type { Section } from '../types'

export const tableTypes: Section = {
  id: 'table-types',
  title: 'External, Iceberg and hybrid tables',
  scene: 'table-types',
  focus: 'selection',
  slide: `## Other table types, chosen by their boundaries

**Standard** tables are the default for analytics. The others exist for specific needs, and each changes **where data lives** and **what Snowflake can promise**.

### The three alternatives
- **Iceberg**: open-format files other engines can read too; with your own storage, **recovery is yours**
- **External**: query files in a stage without loading them; **read-only**
- **Hybrid**: row storage for fast single-row reads and writes; **enforced keys**, no UNDROP

### How to choose
- Start from the **requirement**, not the feature list
- Check edition, Region and current limits before committing
- The retail core stays **standard**; each alternative serves one edge`,
  narration:
    "Everything in this chapter so far has been about standard tables, and for analytics they remain the default. Snowflake also offers other table types, and the honest way to compare them is by their boundaries: where the data lives, and what Snowflake can promise about it. Iceberg tables store data as Apache Iceberg files, an open format that other engines such as Spark can read too. With Snowflake acting as the catalog, you get full data changes from Snowflake. If the files live in your own cloud storage, though, protecting and recovering them is your responsibility, not Fail-safe's. External tables let you query files sitting in a stage without loading them at all, which is handy for occasional reads of an archive, but they are read-only. Hybrid tables store rows rather than columns, for fast single-row reads and writes at high concurrency. They require a primary key and enforce it, unlike standard tables, but they don't support undrop. For our retailer, the core stays standard. A shared lake for the data science team might use Iceberg, old files might stay external, and an order-status lookup for the app might suit a hybrid table. Always start from the requirement, and check edition, Region and current limits before committing. With tables understood, the next chapter loads real data into them.",
}
