import type { Section } from '../types'

export const architectureOptionsSection: Section = {
  id: 'architecture-options',
  title: 'End-to-end alternatives for ingestion, transformation and serving',
  scene: 'architecture-options',
  focus: 'compare',
  slide: `## Three shapes, one product

The same orders can reach the same revenue figure by three routes. Judge them on the **requirements**, not on novelty.

### The alternatives
- **A — full rebuild**: COPY nightly, then recompute everything
- **B — streams + tasks**: Snowpipe, then a task **MERGEs** the changes
- **C — dynamic tables**: Snowpipe, then declared results with a **target lag**

### What decides
- **Freshness**: daily, per schedule, or per target lag
- **What you own**: one query, offsets and a MERGE, or a result query
- **Recovery**: rerun a day, rebuild a stream, or a full refresh

### RETAILCO's answer: per input
- Orders → **C**, customers → **B** for late CDC, reference data → **A**`,
  narration:
    "There is more than one way to build this product end to end, and each earlier chapter showed a piece of each. Option A is the full rebuild: copy the day's files every night, then recompute the results from scratch. Option B is streams and tasks: Snowpipe loads files as they land, and a task merges the changes the stream reports. Option C is dynamic tables: Snowpipe again, then results declared as queries with a target lag. None of them is the modern answer in general. Judge them on the requirements from the last section. Freshness: A is daily, B is as often as its schedule, C follows its target lag. What you own: A is one query; B is offsets and a merge you must get right; C is only the result query. Late customer changes: a rebuild absorbs them naturally, a stream and merge needs the source sequence guard from chapter six, and a dynamic table can only express that rule as a query. Recovery and cost differ too. So RETAILCO chooses per input, not per platform. Orders use dynamic tables, because finance needs thirty minutes. Customer changes use a stream and a guarded merge, because they arrive late and out of order. And reference data, small and rarely changing, is simply rebuilt every night.",
}
