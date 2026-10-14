import type { Section } from '../types'

export const externalOrchestrationSection: Section = {
  id: 'external-orchestration',
  title: 'External orchestration and dbt',
  scene: 'external-orchestration',
  focus: 'split',
  slide: `## One owner for each schedule

Many teams drive Snowflake from an **orchestrator** such as Airflow, and model with **dbt**. Both work well — if responsibilities are clear.

### The boundaries
- The orchestrator owns **cross-system** scheduling and dependencies
- It connects as a **SERVICE user** — \`LOADER_SVC\`, key pair, chapter 2
- Snowflake still owns **compute, transactions and privileges**

### dbt inside Snowflake
- **dbt Projects on Snowflake** stores the project as an object; \`EXECUTE DBT PROJECT\` runs it
- A task, or the orchestrator, schedules it

### The rule
- Each schedule has **one owner**: a task **or** a DAG, never both`,
  narration:
    "Not every team schedules inside Snowflake. Many already use an orchestrator such as Airflow to coordinate work across systems, and dbt to define their models and tests. Both work well with Snowflake, as long as the responsibilities are clear. The orchestrator owns scheduling and the dependencies that cross system boundaries, such as waiting for a source system's export before loading. When it connects to Snowflake, it does so as a service user, our loader service user from chapter two, authenticating with a key pair rather than a password. Everything that happens inside Snowflake still follows Snowflake's rules: the warehouse provides compute, statements commit as transactions, and the service user's roles decide what it may touch. dbt can also run inside Snowflake itself. With dbt Projects on Snowflake, the project is stored as a Snowflake object, and execute dbt project runs it, with either a Snowflake task or the external orchestrator deciding when. That flexibility brings the one rule this section is really about. Every schedule needs exactly one owner. If both a Snowflake task and an Airflow DAG run the same dbt build, it will run twice, overlap, or fail in confusing ways, exactly as it did on the fourth of October, when two builds started at six, fought over the same models, and one of them failed. Decide who owns each schedule, write it down, and the evidence from both sides will tell one consistent story.",
}
