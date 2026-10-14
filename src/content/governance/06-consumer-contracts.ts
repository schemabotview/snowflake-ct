import type { Section } from '../types'

export const consumerContracts: Section = {
  id: 'consumer-contracts',
  title: 'BI, applications and consumer-facing contracts',
  scene: 'consumer-contract',
  focus: 'impact',
  slide: `## Change the definition, not the consumers' numbers

\`DAILY_REVENUE\` now has four consumers: finance BI, the store app, the York partner and a nightly export. Each depends on its **meaning**, not just its columns.

### A definition changes
- Finance wants revenue **net of refunds**: S-01 on 1 October moves from **212.40 to 192.40**
- Changed in place, every consumer's numbers shift **at once**, unannounced
- No error anywhere — the schema is identical

### Version the interface
- Publish \`DAILY_REVENUE_V2\` with the new definition, documented in its comment
- Keep **v1 unchanged** until every consumer has moved, then retire it with notice

### Write the contract down
- Grain, definition, freshness, and how much **notice** of change consumers get`,
  narration:
    "By now, daily revenue has four consumers: the finance dashboards, the store app, which queries it through the SQL API, the York partner through the share, and the nightly export from chapter four. Each depends on what revenue means, not just on the column names. Then finance decides revenue should be net of refunds. A twenty pound refund on order one thousand and three means store S zero one's revenue for the first of October moves from two hundred and twelve forty to one hundred and ninety-two forty. If we simply change the view, every consumer's numbers shift at the same moment. The schema is identical, so nothing errors. The partner's invoice is suddenly different. The app shows different totals from last week's report. Nobody was told. The fix is to version the interface. Publish daily revenue v two with the new definition, and say what it means in its comment. Leave v one exactly as it is, while each consumer moves across deliberately, and retire v one only after giving notice. Behind that is a written contract for each data product: its grain, its definition, its freshness, which here is within fifteen minutes from chapter seven's dynamic table, and how much notice consumers get before anything changes. Contracts turn surprise changes into scheduled ones.",
}
