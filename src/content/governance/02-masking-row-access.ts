import type { Section } from '../types'

export const maskingRowAccess: Section = {
  id: 'masking-row-access',
  title: 'Masking, row access and secure interfaces',
  scene: 'policy-results',
  focus: 'by-role',
  slide: `## The same query, three answers

**Policies** enforce rules at query time, whichever tool or path the query comes through. Enterprise edition or higher.

### Two kinds of policy
- **Row access**: decides which rows exist for this role — a store manager sees only their **store**
- **Masking**: decides what a column **shows** — email masked except for \`SUPPORT\`
- The row policy runs **first**, then masking

### Writing them well
- \`IS_ROLE_IN_SESSION\` respects role hierarchy and secondary roles; \`CURRENT_ROLE\` doesn't
- A **mapping table** of role → store keeps rules as data, not code
- Policies run with the **policy owner's** rights

### Secure views still help
- They shape an interface; policies protect the **data**, everywhere`,
  narration:
    "Enforcement in Snowflake is done with policies, attached directly to tables and columns, so they apply however a query arrives: a dashboard, an export, a share, or someone typing SQL. Policies are an Enterprise edition feature. There are two main kinds. A row access policy decides which rows exist for the querying role. Ours lets analysts see every store, and lets a store manager see only customers whose home store is theirs, looked up in a small mapping table of role and store. A masking policy decides what a column shows. Ours keeps the email domain but hides the name, unless the session holds the support role. When both apply, the row policy runs first, and masking is applied to whatever rows remain. Now watch the same select under three roles. The analyst sees all three customers, with masked emails. The York manager sees only C one fifty, from store S zero two, also masked. Someone holding support alongside analyst sees all three, in the clear. Notice the policies use is role in session rather than current role, so they respect role hierarchy and secondary roles. Keeping the store rules in a mapping table means changing access is a data change, not a code change. Secure views from chapter five still help shape an interface, but policies protect the data itself, everywhere it is read.",
}
