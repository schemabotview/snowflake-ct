import type { Section } from '../types'

export const databaseRoles: Section = {
  id: 'database-roles',
  title: 'Account roles versus database roles',
  scene: 'database-roles',
  focus: 'db-scope',
  slide: `## Roles that belong to a database

A **database role** exists inside one database and can hold privileges only on that database's objects. An **account role** is what a session actually activates.

### How they connect
- \`SALES_READ\` holds USAGE on \`SALES\` and SELECT on its tables
- Grant it **to** \`ANALYST\`; that also implies USAGE on \`RETAIL\`
- A database role is **never** a primary or secondary role

### Why bother
- The database owner manages access **inside** it, without touching account roles
- The access model **moves with the database** — clones, replicas, shares
- Account roles stay few: one per job, built from database roles
- A share's consumers grant its database roles to **their own** account roles
- Account roles cannot be granted **to** database roles`,
  narration:
    "So far every role has been an account role, which exists at the level of the whole account. Snowflake has a second kind: the database role. A database role is created inside one database, and it can only hold privileges on that database's objects. Our retail database gets two of them. Sales read holds usage on the sales schema and select on its tables. Raw write holds the privileges to land data in raw. Notice what a database role cannot do: it can never be the primary or a secondary role in a session. To use its privileges, you grant it to an account role, and granting it also implies usage on the database that contains it. So analyst receives sales read, and loader receives raw write. Why add another layer? There are two good reasons. First, delegation: whoever owns the retail database can shape access inside it, without needing rights to change account-wide roles. Second, portability: because the roles live inside the database, the access model travels with it, into clones, into replicas, and into shares, which we will meet in chapter nine; a consumer of a share grants its database roles to their own account roles. The hierarchy only runs one way, though: an account role can never be granted to a database role. The pattern that results is a small number of account roles, one per job, each assembled from database roles that describe access to specific data.",
}
