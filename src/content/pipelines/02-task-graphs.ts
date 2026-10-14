import type { Section } from '../types'

export const taskGraphs: Section = {
  id: 'task-graphs',
  title: 'Task graphs, compute and execution identity',
  scene: 'task-graph',
  focus: 'graph',
  slide: `## A graph of tasks, one owner

Tasks connect with \`AFTER\` into a **task graph**. Only the **root** has a schedule; each child runs when its predecessors succeed.

### The nightly graph
- \`LOAD_ORDERS\` → \`CLEAN_ORDERS\` → \`BUILD_LINES\` and \`BUILD_CUSTOMER\` in **parallel**
- \`FINALIZE_RUN\` is a **finalizer**: it runs after everything else, **even after a failure**
- Each task can choose its own warehouse or serverless compute, sized to its own work

### Execution identity
- By default a task runs as a **system user** with the **owner role's** privileges
- \`EXECUTE AS USER\` runs it as a named user, so actions are attributable
- All tasks in a graph share **one owner** — so one role answers for the whole pipeline
- \`SHOW TASKS\` lists each task's predecessors and state`,
  narration:
    "Real pipelines have steps that depend on each other, so tasks connect into a graph. Each child task names its predecessor with after, and only the root task carries the schedule. Our nightly graph starts with load orders, which copies the new file into raw. Clean orders follows, deduplicating raw into sales. Then two builds run in parallel, because neither needs the other: the order lines fact table and the customer dimension. Finally, finalize run is a special task called a finalizer. It runs after every other task has finished, and crucially, it runs even when something failed, which makes it the right place to log the outcome and clean up. Each task in the graph can choose its own compute, so a heavy build can use a bigger warehouse while a small step runs serverless. Then there is identity: who is the pipeline acting as? By default, a task runs as a system user carrying the privileges of the task's owner role. Snowflake also lets a task run as a named user, which makes its actions attributable in the logs. Notice one more rule. Every task in a graph has the same owner. That is a useful constraint: exactly one role answers for the whole pipeline, and its privileges define everything the pipeline can do.",
}
