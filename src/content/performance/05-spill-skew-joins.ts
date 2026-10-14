import type { Section } from '../types'

export const spillSkewJoinsSection: Section = {
  id: 'spill-skew-joins',
  title: 'Spill, skew, joins and query shape',
  scene: 'spill-skew-joins',
  focus: 'shapes',
  slide: `## Three shapes of slow

The profile's statistics name the problem. Each shape has a **different first fix**.

### Spill
- Intermediate results that don't fit in memory **spill**: first to **local** disk, then to **remote** storage — much slower
- Reduce the rows earlier; if it still spills, a larger warehouse has more memory

### Skew
- One worker handles most rows because one **key** dominates
- More compute doesn't help: handle the hot key on its own

### Joins and selectivity
- A join whose output dwarfs its inputs is a **grain** problem — chapter 5
- Filter **before** joining: the rewrite joins one month, not three years`,
  narration:
    "Once the scan is fixed, other shapes of slowness show up in the profile, and each has its own first fix. The first is spill. When an operation such as a big sort or join produces more intermediate data than fits in the warehouse's memory, it spills to the warehouse's local disk, which is slower, and if even that runs out, to remote cloud storage, which is much slower still. The profile reports both amounts. The first fix is to reduce how many rows reach that operator. If it still spills after that, a larger warehouse has more memory, and that is a legitimate reason to scale up. The second is skew. Snowflake spreads work across many workers, but if one key value, say one enormous customer, owns most of the rows, one worker does most of the work while the others wait. A bigger warehouse barely helps; handling that hot key separately does. The third is join shape. A join whose output is many times larger than its inputs is usually the grain problem from chapter five. And a filter that only runs after a large join wastes work: the rewrite on the right restricts orders to October first, then joins one month of lines instead of three years. The order of attack is always the same. Reshape the work first, and buy compute last.",
}
