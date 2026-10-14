import type { Section } from '../types'

export const classificationTags: Section = {
  id: 'classification-tags',
  title: 'Classification, tags, lineage and ownership',
  scene: 'classify-tag',
  focus: 'classified',
  slide: `## Know what you hold, who owns it, where it flows

You cannot protect data you haven't found. Governance starts with **metadata**: what each column is, who owns it, and where it goes.

### Classification
- \`SYSTEM$CLASSIFY\` inspects \`CUSTOMERS\` and suggests a **semantic** and a **privacy** category per column
- \`EMAIL\` and \`FULL_NAME\` are **identifiers**; \`POSTCODE\` and \`DATE_OF_BIRTH\` together can **re-identify**
- Auto-tagging writes the result as **tags**; values you set by hand are kept

### Ownership and lineage
- A \`DATA_OWNER\` tag names who decides about the data
- Lineage follows \`EMAIL\` into \`DIM_CUSTOMER\` — and out to an **export file**

### The limit
- Tags **describe**; they don't **enforce** — that is the next section`,
  narration:
    "This chapter is about keeping data safe and useful as more people and systems consume it. It starts with a plain question: what are we actually holding? You can't protect data you haven't found. Snowflake's classification inspects a table's columns and suggests two things for each: a semantic category, what kind of data it is, and a privacy category, how sensitive it is. On our customers table, email and full name come back as identifiers, data that points at one person on its own. Postcode, city and date of birth are quasi-identifiers: harmless alone, but together they can often re-identify someone. With auto-tagging on, the results are written as tags on the columns, and any value you set by hand is respected rather than overwritten. Tags carry more than sensitivity. A data owner tag names the team that decides who may use the data and how. Lineage then shows where a column goes. Email flows from the CRM change feed into customers, then into the customer dimension, and from there into a nightly export file, which is outside Snowflake altogether. Every hop is somewhere the protection has to hold. One limit is worth stating plainly. Classification, tags and lineage describe the data. None of them stops a single query. Enforcement is the next section.",
}
