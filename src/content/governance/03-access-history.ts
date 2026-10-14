import type { Section } from '../types'

export const accessHistory: Section = {
  id: 'access-history',
  title: 'Access and audit history, and evidence limits',
  scene: 'audit-evidence',
  focus: 'audit-result',
  slide: `## Who actually read the email column?

Policies say who **may** read data. **Access history** records who **did** — down to the column.

### ACCESS_HISTORY
- One row per query: the **base objects and columns** it read or wrote
- \`POLICIES_REFERENCED\` shows which masking and row policies applied
- Kept for **365 days**; Enterprise edition

### Reading the result
- \`ANA\` read \`EMAIL\` 41 times — **masked** every time
- \`SUPPORT_BOT\` read it in the clear, as its role allows — is 1,206 expected?
- \`LOADER_SVC\` **wrote** it: the ETL path

### What it cannot prove
- What happened to rows **after** they left Snowflake
- Anything from the last few **hours**: the view lags behind`,
  narration:
    "Policies say who may read data. An auditor, or a privacy request, asks a different question: who actually did? Access history answers it. The access history view records, for every query, the base objects and the individual columns it read or wrote, and the policies that were applied while it ran. It keeps a year of history, and it is an Enterprise edition feature. Here we ask who read the email column of customers during October. The query flattens the list of objects and columns each query touched, keeps only those that read email, and joins to query history for the role. Three users appear. Ana, an analyst, read it forty-one times, and the masking policy applied every time, so she never saw a real address. The support bot read it in the clear, as its role allows. Whether twelve hundred reads in a month is expected is a question for the data owner, and this is exactly the evidence they need to answer it. The loader service user wrote the column, which is the normal ETL path. Be clear about what this evidence cannot prove. It shows what happened inside Snowflake. It cannot show what a user did with rows after an export left the platform. And like the other account usage views, it lags behind real time by a matter of hours, so it suits audit and review, not live alerting.",
}
