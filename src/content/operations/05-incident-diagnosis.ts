import type { Section } from '../types'

export const incidentDiagnosisSection: Section = {
  id: 'incident-diagnosis',
  title: 'Load, task and refresh failures, and diagnosis',
  scene: 'incident-diagnosis',
  focus: 'chain',
  slide: `## Walk back from the symptom

At 08:00 on 7 October finance reports **yesterday's** revenue on today's dashboard. The fix starts with **finding the first thing that broke**.

### Walking back
- The dashboard reads \`REVENUE_DT\`, which refreshed fine — its **source** hadn't changed
- \`CLEAN_ORDERS\` never ran: its predecessor **failed**
- \`LOAD_ORDERS\` failed at 05:30: **Access Denied** on the S3 bucket
- Root cause: an **IAM trust policy** edited in AWS the night before

### Fix the gaps, not just the fault
- Nobody was alerted: add an **error notification** on the root task
- An AWS change broke Snowflake unseen: route integration changes through review
- Finance noticed first: the **freshness alert** from chapter 7 should have`,
  narration:
    "At eight in the morning on the seventh of October, finance reports that today's dashboard still shows yesterday's revenue. Incidents like this are solved by walking backwards from the symptom, one layer at a time, checking evidence rather than guessing. The dashboard reads revenue DT. Its refresh history shows it refreshed successfully at five forty-one, so the dynamic table isn't broken; it faithfully reflected a source that hadn't changed. Its source is the cleaned orders, so next is the clean orders task. It never ran, because its predecessor in the task graph failed. That predecessor is load orders, and task history shows it failed at five thirty with an access denied error on the landing bucket. Now the timeline makes sense. At ten past ten the night before, someone edited the IAM role's trust policy in AWS, breaking the chain of permissions from chapter two. The fix itself took minutes: restore the trust policy and retry the failed task. But a good incident review also asks why it took two and a half hours to notice. Nobody was alerted when the root task failed, so add an error notification. A change in AWS broke Snowflake without anyone on the Snowflake side knowing, so integration changes need a review route. And finance noticed first, which is exactly what chapter seven's freshness alert was meant to prevent.",
}
