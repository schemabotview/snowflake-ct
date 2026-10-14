import type { Section } from '../types'

export const policyTestingSection: Section = {
  id: 'policy-testing',
  title: 'Policy testing, trade-offs and change impact',
  scene: 'policy-testing',
  focus: 'test-matrix',
  slide: `## Test policies as every role, before changing them

A policy that looks right as **your** role can be wrong for everyone else. An administrator's view proves nothing about an analyst's.

### Simulate, don't guess
- \`EXECUTE USING POLICY_CONTEXT\` runs a query **as if** under another role
- Keep a **matrix**: each role, the rows and values it should see, re-checked on every change
- Include the role that should see **nothing**

### Know the blast radius
- \`POLICY_REFERENCES\` lists every column and table a policy protects
- Shares and views **inherit** policy changes — so does every consumer

### Trade-offs to decide up front
- Policy lookups cost time on **every query**
- Separate who may **write** policies from who owns the data`,
  narration:
    "Policies are code, and like any code they need tests. The trap is testing them as yourself. An administrator who runs a query and sees sensible results has proved nothing about what an analyst or a store manager sees. Snowflake can simulate that directly. Execute using policy context runs a query as if the session had a different role, and returns exactly what that role would get. So we keep a matrix: every role, the rows it should see, and whether email should be masked. Analysts see all stores, masked. Each store manager sees only their store. Support sees emails in the clear. And public, which every user has, should see nothing at all, so that row of the matrix matters as much as the others. The whole matrix is re-run on every policy change. Before changing a policy, check its blast radius. Policy references lists every table and column it is attached to. Remember that views and shares inherit the change, so it reaches every consumer at once, including partners. Finally, some trade-offs should be decided deliberately rather than discovered. A policy that looks up a mapping table runs on every query, which costs time. And the right to write and attach policies should sit with a governance role, separate from the teams that own the data. Next, chapter ten takes all of this through releases and incidents.",
}
