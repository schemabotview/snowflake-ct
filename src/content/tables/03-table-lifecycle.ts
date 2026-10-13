import type { Section } from '../types'

export const tableLifecycle: Section = {
  id: 'table-lifecycle',
  title: 'Permanent, transient and temporary tables',
  scene: 'table-lifecycle',
  focus: 'kinds',
  slide: `## Choose how long a table remembers

Every table is **permanent**, **transient** or **temporary**. The choice sets its lifetime and how much history Snowflake keeps for recovery.

### The differences that matter
- **Permanent**: Time Travel up to 90 days on Enterprise, then 7 days of **Fail-safe**
- **Transient**: 0 or 1 day of Time Travel, **no Fail-safe**
- **Temporary**: like transient, but private to one **session** and gone when it ends

### Choosing for the retail product
- \`SALES.ORDERS\` is permanent: the business depends on it
- A batch table rebuilt from files can be **transient** and skip Fail-safe storage
- Retained history is **billed storage**: keep what recovery needs, not more
- \`SHOW TABLES\` reports each table's **kind** and retention days`,
  narration:
    "When you create a table, you also choose how long it remembers. Snowflake has three kinds. A permanent table lives until it is dropped, and it keeps history in two stages. First comes Time Travel, a retention period you set, from zero up to ninety days on Enterprise edition, with a default of one day. During that window, you can query old versions, clone them, and undrop the table. After Time Travel ends, changed and dropped data spends seven more days in Fail-safe. Fail-safe is not something you query. It is a last-resort recovery that only Snowflake can perform. Then the data is gone. A transient table also lives until dropped, but it has at most one day of Time Travel and no Fail-safe at all. A temporary table is like a transient one, but it belongs to a single session: no other session can see it, and it disappears when the session ends. So how should our retailer choose? The cleaned orders table is permanent, because the business depends on it. A batch table that is rebuilt from files every night can be transient, because the files are its backup, and it avoids paying for Fail-safe storage. Remember that all retained history is billed storage, so keep what recovery truly needs, and no more.",
}
