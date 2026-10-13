import type { Section } from '../types'

export const rolesInheritance: Section = {
  id: 'roles-inheritance',
  title: 'Roles, inheritance and least privilege',
  scene: 'role-hierarchy',
  focus: 'custom-roles',
  slide: `## Privileges go to roles, roles go to users

Snowflake grants privileges to **roles**, never directly to people. Granting role A **to** role B gives B everything A can do.

### The hierarchy
- \`ANALYST\` and \`LOADER\` are granted to \`RETAIL_ADMIN\`, which is granted to \`SYSADMIN\`
- \`ACCOUNTADMIN\` sits on top: keep it to a few people, never as a default
- \`PUBLIC\` is granted to everyone — grant nothing sensitive to it
- Custom roles granted up to \`SYSADMIN\` keep their objects **administrable**

### Active roles in a session
- The **primary** role owns whatever the session creates
- **Secondary** roles add their privileges to every other statement
- Least privilege: each role holds **only** what its job needs`,
  narration:
    "In Snowflake, privileges are granted to roles, and roles are granted to users. A person never holds a privilege directly. Roles can also be granted to other roles, and that is how a hierarchy forms: when you grant role A to role B, role B inherits everything role A can do. Our retailer has two working roles. Analyst reads the sales schema, and loader writes the raw schema. Both are granted to retail admin, which owns the retail database, and retail admin is granted to sysadmin, so the whole custom tree stays connected to the system roles that administer the account. At the top sits account admin. It is powerful, but it is not a magic superuser, and it should belong to a small number of people and never be anyone's default. At the bottom is public, which every user and role has automatically, so nothing sensitive should ever be granted to it. Inside a session, roles are active in two ways. The primary role is the one you set with use role, and it owns anything the session creates. Secondary roles, often all of the user's other roles, add their privileges to every other statement. The design principle running through all of this is least privilege: each role holds exactly what its job needs, and nothing more.",
}
