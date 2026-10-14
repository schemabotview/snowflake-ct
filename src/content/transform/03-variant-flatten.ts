import type { Section } from '../types'

export const variantFlatten: Section = {
  id: 'variant-flatten',
  title: 'VARIANT, path access and FLATTEN',
  scene: 'variant-flatten',
  focus: 'flatten-code',
  slide: `## One event becomes many rows

Chapter 4's order events land as JSON in a **VARIANT** column. A **path** reads into it; **FLATTEN** turns an array into rows.

### Reading nested data
- \`payload:customer.id\` walks into an object; \`::VARCHAR\` casts the result
- Keys are **case-sensitive**: \`payload:Order_Id\` returns NULL, not an error
- A VARIANT value can hold up to **128 MB** in current releases

### FLATTEN and cardinality
- Event 1007 has **two** items, so it becomes **two** rows
- Event 1008 has **no** items: without \`OUTER => TRUE\` it **vanishes**
- After flattening, the grain is **one row per item** — sum event-level fields carefully

### Cast explicitly
- Every extracted value is VARIANT until you **cast** it`,
  narration:
    "The order events we streamed in chapter four arrive as JSON, stored in a single VARIANT column called payload. VARIANT holds semi-structured data as it arrived, and current releases allow a value of up to a hundred and twenty-eight megabytes. To read inside it, you use a path. Payload colon order ID reads a top-level key. Payload colon customer dot ID walks into a nested object. Each result is still a VARIANT, so cast it, with double colon, to the type you actually want. One trap: keys are case-sensitive. Ask for Order underscore Id with capitals and you get null, with no error at all. Arrays need FLATTEN. Event one thousand and seven has two items. Lateral flatten over the items array produces one row per item, so that single event becomes two rows, each with its own SKU and line amount. Event one thousand and eight has an empty items array, perhaps an order that was cancelled immediately. By default, flatten produces no rows for an empty array, and that event silently disappears from the result. Setting outer to true keeps it, with nulls for the item columns. And remember section one: after flattening, the grain is one row per item, so summing an event-level field across those rows would amplify it in exactly the same way.",
}
