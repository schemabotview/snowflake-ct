import type { Section } from '../types'

export const continuationSection: Section = {
  id: 'continuation',
  title: 'Specialist continuation and priorities for improvement',
  scene: 'continuation',
  focus: 'triggers',
  slide: `## Where to go next

This course covered the **core** of an analytical data product. Each specialist surface below deserves its own study.

### Beyond the core
- **Iceberg tables**: open table format, readable by other engines
- **Hybrid tables**: row-level transactions with **enforced** primary keys
- **Native Apps**: package logic and data as an installable app
- **Cortex AI**: AI functions such as \`AI_COMPLETE\` and \`AI_CLASSIFY\` in SQL

### Adopt one only for a need
- Each has **limits** to check first — hybrid tables support no streams, dynamic tables or sharing

### RETAILCO's own backlog
- Alert on task failure; decide the **edition**; **drill** recovery; retire legacy`,
  narration:
    "This course covered the core of an analytical data product on Snowflake: from a first query, through access, tables, loading, transformation, change processing, pipelines, performance, governance and operations, to the architecture as a whole. Several surfaces lie beyond it, and each deserves its own study. Iceberg tables keep data in the open Iceberg format, so engines such as Spark can read the same tables. The first question there is which catalog manages them. Hybrid tables serve transactional, row-at-a-time work, with primary keys that are actually enforced. Native Apps package logic and data into an app that other accounts install, and can run containers through Snowpark Container Services. And Cortex AI brings AI functions, such as AI complete and AI classify, into SQL. Adopt one only when a requirement calls for it, and check its limits first. Hybrid tables, for example, cannot feed streams or dynamic tables, and cannot be shared, so they would not slot into our pipeline unchanged. Meanwhile, RETAILCO has its own backlog, in order of risk: an alert on task failure, so finance is never the monitoring system again. A decision on edition, so the disaster recovery account can actually take over. Recovery drills. And retiring the legacy warehouse. Following worked examples is not the same as running production, and the next step is practice.",
}
