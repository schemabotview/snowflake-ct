import type { Section } from '../types'

export const consumingStreams: Section = {
  id: 'consuming-streams',
  title: 'Reading versus consuming a stream',
  scene: 'consume-offsets',
  focus: 'attempts',
  slide: `## Only a committed DML statement moves the offset

Reading a stream and **consuming** it are different. The offset advances only when a DML statement that reads the stream **commits**.

### Three attempts on the same stream
- A plain \`SELECT\` returns 4 rows — the offset **stays**
- A \`MERGE\` that fails rolls back — the offset **stays**, the rows wait
- A \`MERGE\` that commits — the offset **moves** to 12:05
- A \`SELECT\` inside \`BEGIN … COMMIT\` still moves **nothing** — only DML does

### Using that guarantee
- A failed run is simply **re-run**: no change is lost or skipped
- \`BEGIN … COMMIT\` lets several statements see the **same** change set
- A second consumer needs its **own stream** — consuming empties it for everyone`,
  narration:
    "There is an important difference between reading a stream and consuming it. Reading is just a select: you see the changes, and nothing else happens. Consuming means using the stream inside a data-changing statement, such as an insert or a merge, and the offset only advances when that statement's transaction commits. Watch three attempts at ten past twelve. First, someone selects from the stream to see what is waiting. Four rows come back, and the offset doesn't move. Second, the merge into customers runs, but fails halfway, perhaps the warehouse was suspended. The transaction rolls back, and because nothing committed, the offset doesn't move either. The same four rows are still waiting. Third, the merge runs again and commits. Only now does the offset advance, to five past twelve. Note that wrapping a plain select in an explicit transaction changes nothing; only a data-changing statement moves the offset. This behaviour is exactly what you want. A failed run loses nothing and skips nothing, so recovery is simply running it again. If two statements need the same changes, such as a merge and an audit insert, wrap them in one explicit transaction, and both see an identical change set. But notice what consuming means for anyone else: once committed, those changes are gone from that stream. A second consumer must have a stream of its own, with its own offset.",
}
