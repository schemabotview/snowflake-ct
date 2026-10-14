import type { Section } from '../types'

export const validationQuarantine: Section = {
  id: 'validation-quarantine',
  title: 'Validation, rejected rows and quarantine',
  scene: 'rejected-rows',
  focus: 'on-error',
  slide: `## Decide what a bad row does to a load

### Look before loading
- \`VALIDATION_MODE = RETURN_ERRORS\` tests the files and **loads nothing**
- Here: line 5 of the 3 October file has a total of \`'N/A'\`

### ON_ERROR chooses the outcome
- \`ABORT_STATEMENT\` — the **COPY default**: one bad row, nothing loads
- \`SKIP_FILE\` — the **Snowpipe default**: the whole file is skipped
- \`CONTINUE\` — good rows load, bad rows are reported

### Never lose a rejected row
- After a \`CONTINUE\` load, \`VALIDATE(… '_last')\` returns the rejects
- Store them in \`RAW.ORDERS_REJECTS\`: counted, owned, fixed at source
- A skipped file is also a rejection — someone must notice it`,
  narration:
    "Sooner or later a file contains a row that cannot load. The questions are when you find out, and what happens to the rest of the file. To find out early, copy can run as a dry run. With validation mode set to return errors, it tests the staged files and loads nothing at all. Here it reports one problem: line five of the third of October file has a total of N A, which is not a number. Next, decide what a real load should do with that row. The on error option makes the choice. Abort statement is the default for copy: a single bad row stops the whole load, which is safe but means one typo can hold up a day's data. Skip file is the default for Snowpipe, which we meet shortly: the entire file containing the bad row is left unloaded. Continue loads every good row and reports the bad ones. Whichever you choose, the rule is the same: never lose a rejected row. After a continue load, the validate function returns that job's rejected records, and storing them in a quarantine table means they are counted, owned, and fixed at the source rather than forgotten. And remember that a skipped file is a rejection too. If nobody is watching for it, a whole day of orders can quietly go missing.",
}
