import type { Section } from '../types'

export const managedAccess: Section = {
  id: 'managed-access',
  title: 'Managed access schemas and future grants',
  scene: 'managed-access',
  focus: 'managed-schema',
  slide: `## Decide who decides

In a standard schema, each **object owner** can grant access to its objects. In a **managed access** schema, only the **schema owner** — or a role with \`MANAGE GRANTS\` — can.

### Future grants
- \`ON ALL TABLES\` covers tables that exist **now**
- \`ON FUTURE TABLES\` covers tables created **later** in the schema
- Future grants never touch existing tables — pair them with \`ON ALL\`
- Schema-level future grants **win** over database-level ones for the same object type

### Governance responsibilities
- Someone must **own** the grant decisions for each schema
- Review grants on a schedule; nothing expires by itself
- Managed access centralises decisions; it does not make them correct`,
  narration:
    "Once roles exist, the next question is who is allowed to hand out access. In an ordinary schema, the owner of each object makes that decision. If the loader role creates a table in raw, loader can grant select on it to anyone it likes, and over time those decisions scatter across many owners. A managed access schema changes the rule. Only the schema's owner, or a role holding the account-wide manage grants privilege, can grant access to the objects inside it. Object owners still own their objects, but they no longer decide who reads them. Our sales schema is managed in exactly this way. The second tool here is the future grant. Granting select on all tables covers the tables that exist today. Granting select on future tables tells Snowflake to apply the same grant to every table created in that schema from now on. It never reaches back to tables that already exist, which is why the two grants are usually issued together. So when a returns table appears next month, sales read can already query it, with no ticket and no forgotten grant. If future grants exist at both the database and the schema level for the same kind of object, the schema-level ones win. None of this removes the human part. Someone still owns the grant decisions for each schema, and grants never expire by themselves, so they need reviewing.",
}
