import type { Section } from '../types'

export const retriesFailure: Section = {
  id: 'retries-failure',
  title: 'Retries, overlap and partial failure',
  scene: 'partial-failure',
  focus: 'run',
  slide: `## A graph run is not a transaction

Each task **commits on its own**. When \`BUILD_LINES\` fails, \`CLEAN_ORDERS\` has **already** changed \`SALES.ORDERS\` — nothing rolls it back.

### Recovering the run
- \`EXECUTE TASK … RETRY LAST\` re-runs only the **failed** tasks
- \`TASK_AUTO_RETRY_ATTEMPTS\` retries automatically — the default is **0**
- After **10** consecutive failures (the default) a task **suspends** itself

### Overlap
- \`OVERLAP_POLICY = NO_OVERLAP\`, the default, makes a new run wait for the last
- It replaces the older \`ALLOW_OVERLAPPING_EXECUTION\`

### The real safeguard
- Retries are safe only if each task is **idempotent** — chapter 6's guarded MERGE
- The finalizer still runs: the failure is **logged**, not lost`,
  narration:
    "Here is the night of the third of October. Load orders succeeded, and so did clean orders, which updated the sales orders table. Then build lines failed, while build customer succeeded, and the finalizer logged the run as failed. Look at the committed column. A task graph is not a transaction. Each task commits its own work, so when build lines failed, the change clean orders made to sales orders had already happened, and nothing rolled it back. For a few hours, sales is up to date but the fact table is stale. Recovery starts with retry. Execute task with retry last re-runs only the tasks that failed, rather than the whole graph. You can also ask Snowflake to retry automatically, with task auto retry attempts on the root task, but the default is zero, so it only happens if you set it. If a task keeps failing, after ten consecutive failures by default it suspends itself, so someone has to notice. Overlap matters too. With the default overlap policy, no overlap, a new scheduled run waits rather than running alongside one that is still going. This setting replaced an older parameter, allow overlapping execution. But the real safeguard isn't a parameter. Retries and reruns are only safe when each task is idempotent, like chapter six's guarded merge, so running it twice does no harm.",
}
