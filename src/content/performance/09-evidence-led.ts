import type { Section } from '../types'

export const evidenceLed: Section = {
  id: 'evidence-led',
  title: 'Evidence-led optimisation and regression checks',
  scene: 'optimise-evidence',
  focus: 'comparison',
  slide: `## A faster query is not always a cheaper system

Optimisation is a loop: **baseline**, one **hypothesis**, one **change**, **compare** on time *and* credits, then **watch** for regressions.

### Judging the clustering key
- Latency: **14.2 s → 1.1 s** — clearly faster
- Dashboard compute saves about **1.5 credits a day**
- Reclustering costs about **6 credits a day**: net, the system costs **about 4× more**

### The decision
- The predicate rewrite reaches the same **1.1 s** for nothing — do that first
- Cluster only if the business values the latency above **4.5 credits a day**
- Write the decision down **with its numbers** — chapter 11's decision records

### Keep watching
- Re-measure after data growth: today's win can be next quarter's regression`,
  narration:
    "Let's finish by judging an optimisation properly, because faster and cheaper are not the same thing. Good optimisation is a loop. Take a baseline with warm medians. Form one hypothesis about the cause. Make one change, ideally in a cloned development database. Compare on both time and credits. Then keep watching for regressions. Apply that to adding a clustering key on order date. Latency falls from fourteen point two seconds to one point one, which is a clear win. Partitions scanned drop from eighteen thousand to three hundred and twelve. Now the credits. The dashboard query runs about two hundred times a day, and the faster version saves roughly one and a half credits a day of dashboard compute. But keeping the history table clustered costs about six credits a day in background reclustering. Net, the system now costs about four times as much as before. So what should we do? Remember the predicate rewrite from section two. It reached the same one point one seconds for nothing. That comes first. Clustering is only justified if the business values that speed above about four and a half credits a day, perhaps for other queries that can't be rewritten. Whatever we decide, we write it down with the numbers, as a decision record. And we re-measure after the data grows, because today's win can be next quarter's regression.",
}
