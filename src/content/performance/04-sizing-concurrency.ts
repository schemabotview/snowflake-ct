import type { Section } from '../types'

export const sizingConcurrency: Section = {
  id: 'sizing-concurrency',
  title: 'Warehouse sizing, concurrency and isolation',
  scene: 'scale-up-out',
  focus: 'symptoms',
  slide: `## Bigger, or more of them

Two symptoms that both feel like "slow" need **opposite** remedies. The evidence tells them apart.

### One query slow on its own
- Long execution, perhaps spilling, **no queue time**
- **Scale up**: each size doubles compute and credits per hour
- **Gen2** standard warehouses (GA 2025) run faster at different rates — check yours

### Many queries waiting
- 40 dashboards at 09:00: fast execution, but **queued** for seconds
- **Scale out**: a multi-cluster warehouse adds clusters while queuing lasts
- Multi-cluster needs **Enterprise** edition; \`STANDARD\` policy favours no queuing, \`ECONOMY\` favours credits

### Before either
- Separate workloads first: \`BI_WH\` and \`LOAD_WH\` never queue each other`,
  narration:
    "Two very different problems both get reported as the warehouse is slow, and they need opposite remedies. The first is one query that is slow on its own. Its profile shows long execution, perhaps spilling to disk, and no time spent queued. Here a bigger warehouse can help, because each size step doubles the compute, and also doubles the credits per hour, from one for extra small, through two, four, eight, to sixteen for extra large on first-generation standard warehouses. Second-generation standard warehouses, generally available since twenty twenty-five, run on faster hardware at different rates, so check which your account uses. That is scaling up. The second is the nine o'clock rush: forty people open their dashboards at once. Each query is quick, but they queue behind one another, and query history shows the time as queued overload. A bigger warehouse is the wrong tool here. What helps is more warehouses of the same size, which is what a multi-cluster warehouse does. Set a minimum of one cluster and a maximum of three, and Snowflake starts extra clusters while queries are queuing, then shuts them down. Forty-five minutes at three small clusters costs four and a half credits. Multi-cluster needs Enterprise edition, and the standard scaling policy favours avoiding queues, while economy favours saving credits. And before either, isolate workloads. Our dashboards and loads already have their own warehouses, so a heavy load can never queue a dashboard.",
}
