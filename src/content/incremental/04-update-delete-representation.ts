import type { Section } from '../types'

export const updateDeleteRepresentation: Section = {
  id: 'update-delete-representation',
  title: 'Updates, deletes and stream modes',
  scene: 'stream-output',
  focus: 'standard',
  slide: `## Net changes, as DELETE and INSERT rows

A stream adds \`METADATA$ACTION\` and \`METADATA$ISUPDATE\` to each row. An **update** is a **pair**: the old row as DELETE, the new row as INSERT.

### Reading the day's changes to CUSTOMERS
- C-207: DELETE Hull + INSERT York, both \`ISUPDATE = TRUE\`
- C-388: a plain INSERT; C-311: a plain DELETE
- **Leeds never appears** — the stream shows the net change only

### Choosing the mode
- **Standard** streams return inserts, updates and deletes
- **Append-only** streams return inserts only, and are cheaper to read
- Use append-only on the **insert-only** change log, standard on tables that are updated

### The lesson
- Need every intermediate step? Read the **source log**, not a stream`,
  narration:
    "What does a stream actually return? Each row comes with extra metadata columns. Metadata action says whether the row is an insert or a delete, and metadata is update says whether it is part of an update. That is because a stream has no separate update action. An update appears as a pair of rows: the old version as a delete, and the new version as an insert, both flagged as part of an update. Here is a standard stream on the customers table, covering the second of October. Customer C two oh seven shows a delete of Hull and an insert of York, both marked as an update. C three eight eight is a plain insert, and C three one one is a plain delete. Now look for Leeds. It isn't there. C two oh seven really did live in Leeds for a couple of hours, but a stream returns only the net difference between its offset and now, so intermediate states vanish. Streams come in two modes. A standard stream returns inserts, updates and deletes, which requires work to pair old and new rows. An append-only stream returns inserted rows only, and is cheaper to read. Our raw change log is insert-only, so an append-only stream suits it perfectly. The lesson is the same as section one: if you need every intermediate step, read the source log.",
}
