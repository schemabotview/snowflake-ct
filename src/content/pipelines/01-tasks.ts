import type { Section } from '../types'

export const tasks: Section = {
  id: 'tasks',
  title: 'Tasks, schedules, triggers and prerequisites',
  scene: 'task-anatomy',
  focus: 'task-code',
  slide: `## A task is one statement, plus when and on what

A **task** runs one SQL statement or procedure call. You choose **when** it runs and **what compute** it uses.

### When it runs
- **Scheduled**: an interval or a CRON expression with a time zone
- **Triggered**: \`WHEN SYSTEM$STREAM_HAS_DATA(...)\` — runs only when chapter 6's stream has changes
- Every task is created **suspended**; \`RESUME\` starts it

### What it runs on
- A **warehouse** you size and pay for by the second
- Or **serverless** compute Snowflake sizes, up to the equivalent of 2XL

### Before it can run
- The owner role needs \`EXECUTE TASK\`, granted by \`ACCOUNTADMIN\`
- A task runs with its **owner role's** privileges`,
  narration:
    "Everything we have built so far ran because someone ran it. This chapter makes it run by itself. The basic unit is a task. A task holds exactly one SQL statement, or one call to a procedure, plus two decisions: when it runs, and what compute it runs on. Our retailer has two. The nightly load runs on a schedule, a CRON expression for half past five every morning, London time, and uses the load warehouse. The customer apply task has no schedule at all. It is triggered: its when clause checks whether chapter six's stream has data, and it runs only when there are changes to apply. It uses serverless compute, which Snowflake sizes for you, up to the equivalent of a two X large warehouse. A warehouse task, by contrast, runs on a warehouse you size and pay for by the second. Two things surprise people. First, every task is created suspended, so nothing happens until you resume it. Second, a task needs permission to run at all. The role that owns it must hold the execute task privilege, which only an account administrator can grant, plus usage on its warehouse, or execute managed task for serverless. And the task runs with its owner role's privileges, so that role must be able to do everything the SQL inside it does.",
}
