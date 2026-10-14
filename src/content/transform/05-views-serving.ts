import type { Section } from '../types'

export const viewsServing: Section = {
  id: 'views-serving',
  title: 'Views, secure views and materialized views',
  scene: 'serving-views',
  focus: 'view-kinds',
  slide: `## One definition, several interfaces

A **view** stores a query, not data. \`DAILY_REVENUE\` puts the revenue definition — "not cancelled" — in **one** place every consumer reads.

### Secure views
- Hide the definition from non-owners and turn off optimizations that could **leak** rows
- Use them where disclosure matters; they can be **slower**
- They protect one interface — they do **not** replace policies (chapter 9)

### Materialized views
- **Store** precomputed results, kept current in the background
- **One table, no joins**; Enterprise edition or higher
- Pay **storage and maintenance** compute — worth it only when read often

### Check the definition
- S-01's 212.40 is chapter 1's shipped total; S-02's 58.00 excludes the cancelled order`,
  narration:
    "Once a transformation is right, consumers need a stable way to read it. A view is the simplest: it stores a query, not data, and runs that query whenever someone reads it. Daily revenue is a view over orders, and it is where the business definition of revenue lives: everything except cancelled orders, summed by date and store. Every dashboard that reads the view gets the same definition, and changing the definition happens in one place. Check its output against what we know. Store S zero one on the first of October shows two hundred and twelve forty, the shipped total from chapter one. Store S zero two shows fifty-eight, because the cancelled order is excluded. A secure view adds protection for a specific disclosure concern. Its definition is hidden from everyone except its owner, and Snowflake switches off certain optimizations that could otherwise reveal rows the view filters out. That protection costs performance, so use secure views where disclosure matters, such as the partner view of one store, not everywhere. And a secure view protects one interface; it is not a replacement for the masking and row access policies we meet in chapter nine. A materialized view goes further and stores precomputed results, which Snowflake keeps current in the background. It can read only one table, with no joins, needs Enterprise edition, and costs storage plus maintenance compute.",
}
