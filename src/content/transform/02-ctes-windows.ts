import type { Section } from '../types'

export const ctesWindows: Section = {
  id: 'ctes-windows',
  title: 'CTEs, window functions and QUALIFY',
  scene: 'window-latest',
  focus: 'ranked-rows',
  slide: `## Rank within a group, keep every row

A **window function** computes across related rows **without collapsing them**. \`GROUP BY\` returns one row per group; a window returns every row with extra columns.

### Reading the example
- \`WITH ranked AS (...)\` names the step; \`ROW_NUMBER()\` ranks orders, newest first
- \`SUM(...) OVER (PARTITION BY customer_id)\` puts the customer's total on every row
- \`QUALIFY rn = 1\` filters on the window result — one row per customer

### The tie
- C-207 placed orders 1001 and 1003 on the **same date**
- Ordering by date alone makes "latest" **arbitrary** between runs
- Adding \`order_id DESC\` makes the choice **deterministic**: 1003`,
  narration:
    "Many analytical questions are about a row in relation to its neighbours. What is each customer's latest order? What share of their spending was this order? Window functions answer these without collapsing rows. A group by returns one row per group. A window function returns every input row, with extra columns computed across a related set of rows, called the partition. Here, row number ranks each customer's orders by date, newest first. A windowed sum puts each customer's total on every one of their rows, so C two oh seven's two orders both show one hundred and sixty-four forty. Then qualify filters on the window result, in the same way that having filters on aggregates, and keeps only rank one: one latest order per customer. Look closely at C two oh seven, though. Both orders were placed on the same date. Ordering by date alone leaves a tie, and Snowflake is free to break it differently each time the query runs, so the latest order could flip between runs. Adding the order ID as a second sort key makes the result deterministic: order one thousand and three. This is the same tie-breaker rule we met with merge in chapter three. Finally, the with clause, a common table expression, gives each step a name, which keeps a long transformation readable and reviewable.",
}
