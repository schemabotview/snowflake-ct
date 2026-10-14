import type { Section } from '../types'

export const incrementalMerge: Section = {
  id: 'incremental-merge',
  title: 'Incremental MERGE by business key',
  scene: 'incremental-merge',
  focus: 'merge-code',
  slide: `## Apply changes by key, guarded by sequence

An incremental MERGE applies **only the new events** from the stream, matched on the **business key**, \`CUSTOMER_ID\`.

### Four rules in one statement
- **One event per key**: \`QUALIFY\` keeps the highest \`SOURCE_SEQ\`
- **Deletes**: an \`op = 'D'\` event removes the row
- **Never backwards**: update only if \`s.source_seq > t.source_seq\`
- **New keys** insert — unless their latest event is a delete

### Check the outcome
- C-207 → York (103), C-388 inserted (102), C-311 removed (104), C-150 untouched
- Run the same batch **again**: nothing changes — the MERGE is **idempotent**

### Store the sequence on the target
- \`SOURCE_SEQ\` on each row is what makes the guard possible`,
  narration:
    "Now we can apply the changes. An incremental merge reads only what is new in the stream, and matches it to the customers table on the business key, the customer ID. Four rules make it correct, and all four live in one statement. First, one event per key. The stream may hold several events for the same customer, so qualify keeps only the one with the highest source sequence. That is chapter three's lesson again: merge needs one source row per target row. Second, deletes. An event with operation D removes the customer. Third, never go backwards. The update only happens when the incoming sequence is higher than the one already stored on the row. Fourth, new keys are inserted, unless their latest event is a delete, in which case there is nothing to insert. Check the outcome. C two oh seven moves to York, with sequence one oh three. C three eight eight is inserted. C three one one is removed. C one fifty is untouched. Now run exactly the same batch again. Every incoming sequence is equal to the stored one, so nothing changes. The merge is idempotent, which means re-runs are always safe. Notice what made that possible: storing the source sequence on every target row. Without it, the guard has nothing to compare against.",
}
