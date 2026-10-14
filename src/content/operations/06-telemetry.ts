import type { Section } from '../types'

export const telemetry: Section = {
  id: 'telemetry',
  title: 'Account usage, information schema and telemetry',
  scene: 'telemetry-sources',
  focus: 'sources',
  slide: `## Fresh or long, rarely both

Operational evidence lives in three places. Each trades **freshness** against **history** — pick by the question.

### The three sources
- \`INFORMATION_SCHEMA\`: **no latency**, but days to months of history, one database at a time
- \`ACCOUNT_USAGE\`: a **full year**, the whole account, but **45 minutes to 3 hours** behind
- **Event tables**: logs and traces your own procedures and apps write

### Access
- \`ACCOUNT_USAGE\` is \`ACCOUNTADMIN\`-only by default
- Grant **SNOWFLAKE database roles** such as \`USAGE_VIEWER\` instead of handing out admin
- Auditors get \`GOVERNANCE_VIEWER\` — nobody needs \`ACCOUNTADMIN\` just to read history

### Matching question to source
- **Failing now?** Information schema · **Last month?** Account usage · **Why, inside the code?** Event table`,
  narration:
    "During the incident we needed task history from the last few hours. For the monthly cost review in chapter eight, we needed a whole month. Those questions need different sources, because operational evidence in Snowflake trades freshness against history. The information schema has no latency at all: it reflects what is happening right now. But it keeps only days to months of history, depending on the function, and it covers one database at a time. That makes it right for an incident in progress. The account usage views in the shared Snowflake database keep a full year, cover the whole account, and include objects that have since been dropped. But they lag behind, from forty-five minutes to about three hours depending on the view. That makes them right for trends, audits and cost reviews, and wrong for a live incident, where today's failure may not have arrived yet. The third source is event tables, which hold logs and traces written by your own procedures, functions and applications: the evidence from inside your code. Access needs thought too. By default, only account admin can read account usage. Rather than handing that role to operators, grant them the Snowflake database roles designed for it, such as usage viewer, or governance viewer for auditors. Then match the source to the question.",
}
