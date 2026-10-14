import type { Section } from '../types'

export const objectHierarchy: Section = {
  id: 'object-hierarchy',
  title: 'Databases, schemas and fully qualified names',
  scene: 'object-tree',
  focus: 'db-retail',
  slide: `## Every object has an address

Tables, views and stages live in a **schema**, which lives in a **database**. Users, roles, warehouses and integrations live directly in the **account**.

### The retail layout used from here on
- \`RAW\` holds data **as landed**, including an \`ORDERS\` table and the \`LANDING\` stage
- \`SALES\` holds **cleaned** data: \`ORDERS\`, \`CUSTOMERS\`, the \`DAILY_REVENUE\` view
- \`REFERENCE\` holds products and stores
- Each schema groups objects with the **same lifecycle and access**

### Fully qualified names
- \`database.schema.object\` names exactly **one** object
- \`RAW.ORDERS\` and \`SALES.ORDERS\` are **different tables** with the same short name
- \`SHOW SCHEMAS IN DATABASE retail\` lists the three
- Account-level objects take a bare name: \`USE WAREHOUSE bi_wh\``,
  narration:
    "Every Snowflake object has an address, and it helps to know which level of the tree it lives at. Tables, views and stages live inside a schema, and every schema lives inside a database. That gives each of them a three-part name: database, schema, object. Some objects are not stored in any database at all. Users, roles, warehouses and integrations belong to the account itself, so they are named with a single word. For the rest of the course, our retailer's data sits in one database called retail, with three schemas. Raw holds data exactly as it landed from the sources, including an orders table and a stage that points at cloud storage. Sales holds the cleaned data: orders, customers, and a daily revenue view. Reference holds products and stores. Each schema groups objects that share a lifecycle and an audience, which, as we'll see, makes access far easier to grant. Notice that raw and sales both contain a table called orders. That is deliberate and very common, because the landed copy and the cleaned copy are naturally called the same thing. A fully qualified name tells them apart without any doubt. A short name does not, and in the next section we will see exactly how that goes wrong.",
}
