import type { Section } from '../types'

export const queryProfile: Section = {
  id: 'query-profile',
  title: 'Query history, query profile and timing',
  scene: 'profile-reading',
  focus: 'operators',
  slide: `## Find where the time went

The retail product now holds three years of orders in \`ORDERS_HISTORY\` — about **1.2 billion rows**. One dashboard query takes **14.2 seconds**. Measure before changing anything.

### Split the total
- \`QUERY_HISTORY\` separates **compilation**, **queuing** and **execution**
- No queue time here: the warehouse was free — the work itself was slow

### Read the operator tree
- \`TableScan\` takes **89%** of execution
- It read **18,240 of 18,240** partitions: nothing was skipped
- 1.2 billion rows in, 1.1 million out of the filter — most of the read was wasted

### The habit
- Find the dominant operator first; ignore the rest until it is fixed`,
  narration:
    "Our retail product has grown. A history table now holds three years of orders, about one point two billion rows, and one dashboard query takes fourteen seconds. The temptation is to make the warehouse bigger. The discipline is to find out where the time actually went first. Query history is the starting point. It splits a query's total time into compilation, time spent queued, and execution. Here, queuing was zero, so the warehouse was free when the query arrived. The problem isn't waiting; it is the work itself. The query profile then shows that work as a tree of operators, each with its share of execution time. Read it from the bottom. The table scan took eighty-nine percent of the time. Its statistics say it scanned eighteen thousand two hundred and forty partitions, out of eighteen thousand two hundred and forty in total: it skipped nothing. Then look at the row counts on the edges. One point two billion rows came out of the scan, and only one point one million survived the filter. So almost everything read was thrown away straight afterwards. The aggregate and the join barely register. That gives us the habit for this whole chapter: find the dominant operator, explain it, fix it, and only then look at anything else.",
}
