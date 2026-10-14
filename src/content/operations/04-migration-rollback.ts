import type { Section } from '../types'

export const migrationRollbackSection: Section = {
  id: 'migration-rollback',
  title: 'Clones, schema migration and rollback limits',
  scene: 'migration-rollback',
  focus: 'failed',
  slide: `## Rolling back code is not restoring data

On 6 October an earlier attempt at release 1.4 **renamed a column**, then **failed** recreating the view. The table changed; the view broke.

### Why it hurt
- Snowflake has no transaction around a **multi-statement release**: each DDL commits on its own (chapter 3)
- Reverting the **Git commit** doesn't revert the **renamed column**

### Change columns in stages
- **Expand**: add the new column alongside the old one
- **Migrate** readers, one release at a time
- **Contract**: drop the old column only when nothing reads it

### Keep a way back
- **Clone** the database before the release — seconds, zero-copy
- A clone restores **state**; rows loaded since must be **re-applied**`,
  narration:
    "Here is what happened on the evening of the sixth of October, on an earlier attempt at release one point four. The release renamed a column on orders, from order total to gross total, and then tried to recreate daily revenue to use the new name. The second step failed on a syntax error. The rename had already committed, because, as we saw in chapter three, each D D L statement commits on its own, and there is no transaction wrapped around a whole release. So the table had changed, the view still referred to the old column name, and every dashboard showed an invalid identifier error. Reverting the Git commit didn't help at all. The repository went back to the old definition, but the renamed column in production didn't. Rolling back code is not the same as restoring data or schema. Two habits prevent this. The first is to change columns in stages. Expand: add the new column alongside the old one. Migrate: move readers across, one release at a time. Contract: drop the old column only once nothing reads it. At no point does a single failure leave readers broken. The second is to keep a way back. Cloning the database before a release takes seconds and copies nothing. But remember what a clone is: a restore point for state, so any rows loaded after it was taken must be re-applied.",
}
