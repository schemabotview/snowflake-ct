import type { Section } from '../types'

export const loadHistory: Section = {
  id: 'load-history',
  title: 'Load history, retries and duplicate boundaries',
  scene: 'file-identity',
  focus: 'boundaries',
  slide: `## Files are deduplicated, orders are not

COPY keeps **load metadata** per table for 64 days and skips files it has already loaded. That makes a **retry safe** — for the same file.

### What happened on 2 October
- 06:00 loads the daily file: **6** rows
- 06:30 retry of the same COPY: file **skipped**, 0 rows
- 09:00 the source **resends** orders 1001–1003 as a new file: **3** more rows

### Where the boundary sits
- Load metadata knows **files**, not business keys
- \`FORCE = TRUE\` reloads files deliberately — duplicates included
- Snowpipe and COPY keep **separate** metadata: don't mix them on one table

### The control that works
- Deduplicate on the **order ID** downstream, and test for it`,
  narration:
    "So what happens if a load runs twice? Copy keeps load metadata for each table, a record of which files it has loaded, for sixty-four days. When the same copy runs again over the same folder, files it has already loaded are skipped. Here is the second of October. At six, copy loads the daily file: six rows. At half past six, a scheduler retries the job after a timeout. The file is recognised and skipped, and nothing is duplicated. So far, so safe. Then at nine, the source system resends three orders it believes went missing, in a new file called orders resend. To the load metadata, that is a new file, so copy loads it: three more rows. Orders one thousand and one to one thousand and three now appear twice in raw orders. This is exactly where the nine rows we met in chapter two came from. The boundary is the important lesson. Load metadata protects against loading the same file twice. It knows nothing about orders, so it cannot protect against the same orders arriving in a different file. Force set to true deliberately reloads files, duplicates and all. And Snowpipe keeps its own separate metadata, so mixing both on one table can double-load. The control that actually works is deduplicating on the business key, the order ID, downstream, and testing that it holds.",
}
