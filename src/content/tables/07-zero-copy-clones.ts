import type { Section } from '../types'

export const zeroCopyClones: Section = {
  id: 'zero-copy-clones',
  title: 'Zero-copy clones, shared storage and costs',
  scene: 'clone-storage',
  focus: 'shared',
  slide: `## Zero-copy at first, independent afterwards

\`CLONE\` creates a database, schema or table that **shares** the source's micro-partitions. Nothing is copied, so it takes seconds.

### After the clone
- Changes on **either** side write new micro-partitions that only that side owns
- The clone never sees production's new orders; production never sees test edits
- Storage grows only with **changed** data, billed to the table that wrote it

### What a clone is not
- Not a **backup**: same account, same Region, same administrators
- A table clone carries **no grants** unless you add \`COPY GRANTS\`
- Deleting source data that a clone still uses keeps those bytes **billed**`,
  narration:
    "A clone is one of Snowflake's most useful tricks. When you clone a database, a schema or a table, the new object simply points at the same micro-partitions as the source. Nothing is copied, so even a large database clones in seconds, and at first the clone costs no extra storage. That makes it ideal for a test environment: our team clones the retail database into retail dev and experiments freely. From that moment, the two are independent. When production loads new orders, it writes new micro-partitions that belong only to production, and the clone never sees them. When a tester updates rows in the clone, the changed data goes into new micro-partitions that belong only to the clone. The unchanged partitions stay shared. Storage therefore grows only with changed data, and it is billed to the table that first wrote it. Two cautions. First, a clone is not a backup. It lives in the same account, in the same Region, under the same administrators, so whatever could destroy the source could destroy the clone too. Second, cloning a table does not copy its grants unless you ask for copy grants. And if you delete data from the source that a clone still uses, those bytes stay stored, and stay billed, for as long as the clone needs them.",
}
