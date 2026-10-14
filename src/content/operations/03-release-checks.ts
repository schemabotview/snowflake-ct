import type { Section } from '../types'

export const releaseChecksSection: Section = {
  id: 'release-checks',
  title: 'Tests, reconciliation and release checks',
  scene: 'release-checks',
  focus: 'checks',
  slide: `## Evidence before promotion

A release is promoted from test to prod only with **evidence** that it does what it should — and **nothing** it shouldn't.

### The checks for release 1.4
- The **plan** adds two objects and drops nothing
- A **unit test** on fixed rows: S-01 on 1 Oct = **192.40**
- A **contract test**: v1 returns **exactly** what it did
- **Reconciliation** and the **policy matrix** from chapters 4 and 9 still pass
- The new query stays within its **performance** budget

### Promotion rules
- A failed check promotes **nothing**: fix in dev, rerun the **whole** set
- A failed **contract test** means a **new version** (chapter 9), not an edit
- After deploying, smoke-test both versions and watch the first runs
- Keep a **release record**: commit, checks, approver`,
  narration:
    "Testing data platforms has a reputation for being hard, but most of what matters can be checked with plain SQL, and each check reuses something from earlier in the course. Release one point four runs six checks in the test database before it can be promoted. First, the plan itself: it should add the refunds table and the new view, and drop nothing. An unexpected drop in a plan is the cheapest bug you'll ever catch. Second, a unit test on fixed input rows: with a twenty pound refund on order one thousand and three, store S zero one on the first of October must come out at one hundred and ninety-two forty. Third, a contract test. Version one of daily revenue must not move at all while consumers still read it, so we compare it before and after the release, and expect zero differing rows. Fourth, reconciliation against the source manifest, from chapter four. Fifth, the policy matrix from chapter nine, because a release that recreates a table can silently drop its policies. Sixth, a performance budget, so the new view stays under two seconds on the BI warehouse. Only then is the release promoted. After deploying, smoke-test both versions, watch the first task runs and refreshes, and write a release record: which commit, which checks passed, and who approved it. And when a check fails, nothing is promoted. Fix it in development and rerun the whole set, because a fix for one check can break another. A failing contract test is a special case: it means version one consumers would break, so the change belongs in a new version, as chapter nine showed, not in the existing one.",
}
