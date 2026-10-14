import type { Section } from '../types'

export const queryGrain: Section = {
  id: 'query-grain',
  title: 'Query grain, joins and duplicate amplification',
  scene: 'grain-amplification',
  focus: 'wrong-query',
  slide: `## A join changes the grain

The **grain** is what one row means. \`ORDERS\` has one row per order; \`ORDER_LINES\` has one row per line. A join produces rows at the **finer** grain.

### The amplification
- Order 1001 has 2 lines, 1003 has 3: after the join they appear **2 and 3 times**
- \`SUM(order_total)\` then counts each order once **per line**: 451.70
- The true shipped revenue is **212.40** — no error was raised

### Staying correct
- Sum a measure **at its own grain**: line amounts at line grain
- Or aggregate lines to order grain **before** joining
- State the grain of every table and every result

### A quick test
- Compare \`COUNT(*)\` with \`COUNT(DISTINCT order_id)\` after each join`,
  narration:
    "Every table has a grain: the thing that one row represents. Our orders table has one row per order. A new table, order lines, has one row per item on an order. Before writing any transformation, it pays to say the grain out loud, because joins change it. When you join orders to order lines, each order row is repeated once for every line it has. Order one thousand and one has two lines, so it appears twice. Order one thousand and three has three lines, so it appears three times. That is exactly what a join should do. The trouble starts when you then sum a column that belongs to the coarser grain. Summing the order total after the join counts each order once per line, and shipped revenue comes out at four hundred and fifty-one seventy. The real figure, from chapter one, is two hundred and twelve forty. Nothing failed. The query simply answered a different question. The fix is to keep each measure at its own grain. Here, summing the line amounts at the line grain gives the right answer. Alternatively, aggregate the lines up to one row per order before joining. A cheap habit catches this early: after any join, compare the row count with the count of distinct keys you expected.",
}
