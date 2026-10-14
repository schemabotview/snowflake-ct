import type { Section } from '../types'

export const replayRebuild: Section = {
  id: 'replay-rebuild',
  title: 'Staleness, replay, rebuild and recovery',
  scene: 'recovery-decisions',
  focus: 'decisions',
  slide: `## Replay, rebuild or resume

When incremental processing goes wrong, the right response depends on **what was lost** and **what you still have**.

### Matching the response to the failure
- **One failed run**: re-run — the offset never moved
- **Stale stream**: recreate it, then **rebuild** the target from the event log
- **Wrong logic for a week**: **replay** the week's events into a rebuild, compare, swap
- **Old events resent**: nothing — the sequence guard ignores them

### Why the log matters
- A stream is a **cursor**; it cannot replay what has passed
- The landed event log is the **archive** that makes rebuilds possible
- Reconcile counts and samples **before** swapping a rebuild in`,
  narration:
    "Incremental pipelines are efficient, but they will eventually go wrong, and the right recovery depends on what was lost and what you still have. Take the easy case first. A single run failed. Because the offset never moved, you simply run it again, and the same changes are applied. Now a harder one. The stream went unread for too long and became stale. It cannot be read, so recreate it, which starts a fresh offset from now. But the changes it missed are gone from the stream's point of view. The answer is to rebuild the customers table from the full event log: take the latest event for each customer, drop those whose latest event is a delete, and you have the current state, independent of any stream. Suppose instead the merge logic itself was wrong for a week. Replay that week's events, or the whole log, into a rebuilt table, compare it with the live one, and swap it in once the counts and a sample agree. And if a source resends old events, nothing is needed at all: the sequence guard ignores them. Every hard case relies on the same thing. A stream is a cursor; it cannot replay the past. The landed event log is the archive that makes rebuilds possible, so keep it. Next, chapter seven automates this whole loop.",
}
