import type { Section } from '../types'

export const recovery: Section = {
  id: 'recovery',
  title: 'Time Travel, Fail-safe and backups',
  scene: 'recovery-layers',
  focus: 'layers',
  slide: `## What can bring data back, and who holds the key

### Four mechanisms
- **Time Travel**: self-service, up to **90 days** on permanent tables (chapter 3)
- **Fail-safe**: 7 more days, but only **Snowflake support** can recover from it — a last resort, not a plan
- **Clones**: a restore point at the moment taken — sharing storage until the data diverges
- **Backup sets**: scheduled, expiring backups — and only they can be **retention-locked**

### Know the boundaries
- Transient tables have **no Fail-safe**; Iceberg data on your storage relies on **your** backups
- Time Travel can be shortened to **zero** by an admin; a locked backup cannot be deleted by **anyone**
- Retention locks need **Business Critical** and are **irreversible**
- Rehearse a restore: a recovery path nobody has **tried** is a guess`,
  narration:
    "When data is lost, the first question is which mechanism can bring it back, and who holds the key. There are four. Time Travel, from chapter three, is self-service: you query, clone or undrop, as far back as the table's retention, up to ninety days for permanent tables. Fail-safe adds seven more days, but only Snowflake support can recover from it, on a best-effort basis that can take hours or days. It is a last resort, never part of a recovery plan. Clones give you a restore point at the moment you take one, as we did before the release, and they share storage with the source until the data diverges. And backup sets, which became generally available in late twenty twenty-five, take scheduled backups that expire on a policy, and can cover more than tables. The boundaries matter as much as the mechanisms. Transient tables, like our raw batch table, have no Fail-safe at all. Iceberg tables on your own storage depend on your own cloud backups. And there is a subtle difference in who can undo protection. An administrator can shorten Time Travel to zero, deliberately or by mistake. A backup set with a retention lock cannot be deleted by anyone, not even account admin, which is what regulators often require. That lock needs Business Critical edition and is irreversible, so it is a decision to take carefully, because locked backups are undeletable storage you pay for. Finally, rehearse. A recovery path nobody has actually tried is a guess, so restore into a scratch database on a schedule and check the row counts.",
}
