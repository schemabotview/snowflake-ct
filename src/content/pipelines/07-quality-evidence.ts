import type { Section } from '../types'

export const qualityEvidence: Section = {
  id: 'quality-evidence',
  title: 'Data quality, freshness and pipeline history',
  scene: 'pipeline-evidence',
  focus: 'dmf-results',
  slide: `## Prove the data, not just the run

A task that **succeeded** only proves it **ran**. Correctness needs evidence about the **data** itself.

### Data metric functions
- \`DUPLICATE_COUNT\`, \`NULL_COUNT\`, \`FRESHNESS\` attach to a table and run on a **schedule**
- Results land in \`DATA_QUALITY_MONITORING_RESULTS\`
- Enterprise edition; scheduled runs bill **serverless** credits
- Calling a DMF ad hoc in a \`SELECT\` is **not** billed

### Turning results into action
- An **alert** runs a condition on a schedule and notifies when it is true
- Here: email if \`ORDERS\` is more than an hour stale, checked every half hour

### Three kinds of evidence
- \`TASK_HISTORY\`: what ran · DT refresh history: actual lag · quality results: what the data looks like`,
  narration:
    "A pipeline can succeed every night and still deliver wrong data. A task's status only proves that it ran. To know the output is right, you need evidence about the data itself. Snowflake's data metric functions provide that. You attach them to a table and they run on a schedule. Here we attach three to sales orders: duplicate count on the order ID, which should always be zero after deduplication; null count on the total; and freshness on the updated timestamp, which reports how many seconds old the newest row is. Each scheduled measurement lands in a results view. Data metric functions are an Enterprise edition feature, and scheduled measurements run on serverless compute that is billed, so measure what matters, not everything. Measurements only help if someone acts on them, so an alert closes the loop. An alert checks a condition on a schedule and, when it is true, does something, here sending an email if orders are more than an hour stale. Put together, a well-run pipeline has three kinds of evidence. Task history shows what ran, when, and whether it failed. Dynamic table refresh history shows the actual lag achieved, not just the target. And the quality results show what the data actually looks like. You need all three to say the pipeline worked.",
}
