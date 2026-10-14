import type { Scene } from '@graphlearning/flow'

// §8 — an external orchestrator or dbt can drive Snowflake, but each schedule must have exactly
// one owner. The table splits the responsibilities.
export const externalOrchestration: Scene = {
  id: 'external-orchestration',
  title: 'One owner for each schedule',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'ext-path',
      label: 'An externally orchestrated night',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'ext-airflow', label: 'Airflow DAG', sub: 'owns the schedule', pattern: 'external', icon: 'workflow' },
        { id: 'ext-svc', label: 'LOADER_SVC', sub: 'SERVICE user, key pair', pattern: 'user', icon: 'key' },
        { id: 'ext-dbt', label: 'dbt project', sub: 'models, tests', pattern: 'service', icon: 'code' },
        { id: 'ext-wh', label: 'LOAD_WH', sub: 'runs the SQL', pattern: 'service', icon: 'cpu' },
      ],
      edges: [
        { source: 'ext-airflow', target: 'ext-svc', label: 'connects as' },
        { source: 'ext-svc', target: 'ext-dbt', label: 'runs' },
        { source: 'ext-dbt', target: 'ext-wh' },
      ],
    },
    {
      id: 'ext-detail',
      label: 'Or inside Snowflake, and who owns what',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'double-schedule',
          kind: 'table',
          label: 'When both own the schedule, 4 October',
          headers: ['Time', 'Started by', 'Outcome'],
          values: [
            ['06:00', 'task NIGHTLY_DBT', 'build running'],
            ['06:00', 'Airflow DAG', 'second build'],
            ['06:14', 'both', 'one run fails'],
          ],
        },
        {
          id: 'dbt-code',
          kind: 'code',
          filename: 'run_dbt.sql',
          label: `-- the dbt project is a Snowflake object
    EXECUTE DBT PROJECT retail.ops.retail_dbt
  ARGS = 'build --select marts';

    -- ONE owner: this task OR the DAG
    CREATE TASK retail.ops.nightly_dbt WAREHOUSE = load_wh
      SCHEDULE = 'USING CRON 0 6 * * * Europe/London'
    AS EXECUTE DBT PROJECT retail.ops.retail_dbt
     ARGS = 'build';`,
        },
        {
          id: 'split',
          kind: 'table',
          label: 'Who owns what',
          headers: ['Concern', 'Orchestrator / dbt', 'Snowflake'],
          values: [
            ['Schedule, cross-system', 'yes', 'only if no DAG'],
            ['Models, tests, docs', 'dbt', '—'],
            ['Compute, privileges', '—', 'yes'],
            ['Run evidence', 'its own logs', 'TASK_HISTORY'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'ext-path', target: 'ext-detail', label: 'or inside Snowflake' }],
}
