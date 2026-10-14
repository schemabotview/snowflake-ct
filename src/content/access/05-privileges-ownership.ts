import type { Section } from '../types'

export const privilegesOwnership: Section = {
  id: 'privileges-ownership',
  title: 'Privileges, ownership and a denied query',
  scene: 'access-chain',
  focus: 'denied',
  slide: `## A query needs every link in the chain

To read \`SALES.ORDERS\`, \`ANALYST\` needs **USAGE** on the database, **USAGE** on the schema, **SELECT** on the table — and **USAGE** on a warehouse to run it.

### Reading a denial
- "does not exist **or not authorized**" is deliberately ambiguous
- Check the name first, then \`SHOW GRANTS TO ROLE analyst\`
- Here the gap is **USAGE on schema RAW** — by design

### Ownership
- Every object has one **owner role**, holding \`OWNERSHIP\`
- The owner, here \`RETAIL_ADMIN\`, decides who else gets access
- Ownership belongs to a role, so it survives people leaving
- \`WITH GRANT OPTION\` lets a non-owner pass a privilege on
- Revoking from a role removes it for **every** user of that role`,
  narration:
    "A query only runs if every link in a chain of privileges is in place. For our analyst to read the cleaned orders table, the analyst role needs usage on the retail database, usage on the sales schema, and select on the orders table itself. It also needs usage on a warehouse, because without compute nothing runs at all. The role matrix lays out the two working roles side by side. Both can read sales. Only loader can see the raw schema, where it inserts landed data, and each role uses its own warehouse. Now watch what happens when the analyst tries to count the raw orders. The error says the object does not exist or is not authorized. That wording is deliberate. Snowflake will not tell a role about objects it is not allowed to see, so a missing object and a missing grant look identical. Work through it in order: check the fully qualified name first, then show the grants to the role. Here the gap is usage on the raw schema, and it is there on purpose. Behind every grant is an owner. Each object is owned by exactly one role, which holds the ownership privilege and decides who else gets access. Here that is retail admin. Because ownership belongs to a role rather than a person, it survives people changing jobs. An owner can also grant a privilege with grant option, which lets the receiving role pass it on, and revoking a privilege from a role removes it at once for every user who holds that role.",
}
