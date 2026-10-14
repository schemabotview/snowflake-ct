import type { Section } from '../types'

export const lateOutOfOrder: Section = {
  id: 'late-out-of-order',
  title: 'Late updates, tombstones and business time',
  scene: 'late-arrivals',
  focus: 'rules',
  slide: `## Arrival order is not source order

Events can arrive **late**. Event 101 (Leeds, 09:00) was delayed and landed **after** event 103 (York, 11:30). Retries and parallel extraction make this normal.

### Which rule decides
- **Last loaded wins**: C-207 ends in **Leeds** — wrong
- **Highest source sequence wins** keeps **York** — the correct answer
- **Latest change time** works only if every source system's clock agrees
- Keep \`SOURCE_SEQ\` to order, \`LOADED_AT\` to audit

### Tombstones
- A delete event is a **tombstone**: apply it, don't skip it
- Hard-delete the row, or set \`IS_DELETED\` to keep history and lineage
- A late event must not **resurrect** a deleted row

### Business time
- Date history rows by \`CHANGED_AT\`, never by \`LOADED_AT\``,
  narration:
    "Change feeds don't always arrive in order. Network delays, retries and parallel extraction mean an older event can land after a newer one. Here, event one oh one, C two oh seven's move to Leeds at nine o'clock, was delayed. Event one oh three, the move to York at half past eleven, landed first, and Leeds arrived ten minutes later. Now it matters which rule decides. If the last event loaded wins, C two oh seven ends up in Leeds: an older change has silently overwritten a newer one. If the highest source sequence wins, York stays, which is correct. That is exactly what our guarded merge does. Ordering by the time the change happened can also work, but only if every source system's clock agrees, so a sequence from the source log is safer. Deletes need the same care. A delete event is called a tombstone, and it must be applied, not skipped. You can remove the row, or keep it with an is deleted flag, which preserves history and keeps old orders linked to a real customer. And a late update that arrives after a tombstone must not bring the customer back to life. Finally, when you build history, such as chapter five's type two dimension, date each version by when the change happened in the business, never by when it happened to load.",
}
