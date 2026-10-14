import type { Scene } from '@graphlearning/flow'

// §4 — a decision record links one requirement to the option chosen, the options rejected and the
// evidence. The log below collects the course's own decisions in that shape.
export const decisionRecords: Scene = {
  id: 'decision-records',
  title: 'Write down why',
  flow: 'TB',
  padding: 0.08,
  nodes: [
    {
      id: 'adr',
      kind: 'code',
      filename: 'adr/011-revenue-freshness.md',
      label: `# ADR-011  Revenue freshness for finance
Status:      accepted 12 Oct 2026, owner retail-data team
Requirement: revenue at most 30 min old, 07:00-19:00 (§1)
Decision:    MART.REVENUE_DT, TARGET_LAG = '15 minutes'
Rejected:    hourly rebuild: up to 60 min old, scans history
             stream + task: same freshness, more code to own
Evidence:    refresh history: 1 miss in 7 days (ch. 7)
Revisit if:  finance needs < 5 min, or BI_MONTHLY is at risk`,
    },
    {
      id: 'log',
      kind: 'table',
      label: 'The decision log so far',
      headers: ['Area', 'Chosen', 'Rejected', 'Evidence'],
      values: [
        ['Performance', 'range predicate', 'clustering key', '312 of 18,240 partitions'],
        ['Governance', 'row policy STORE_ROWS', 'a view per store', 'policy matrix'],
        ['Cost', 'BI_MONTHLY, 400 credits', 'no cap', 'October ledger'],
        ['Recovery', 'replicate to PROD_DR', 'failover now', 'needs Business Critical'],
      ],
    },
    {
      id: 'parts',
      label: 'Every record links',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'p-req', label: 'Requirement', sub: 'whose, how strict', pattern: 'service', icon: 'receipt' },
        { id: 'p-alt', label: 'Alternatives', sub: 'and why not', pattern: 'service', icon: 'gitbranch' },
        { id: 'p-evidence', label: 'Evidence', sub: 'a query, not a hope', pattern: 'service', icon: 'search' },
        { id: 'p-revisit', label: 'Revisit if', sub: 'what would change it', pattern: 'service', icon: 'history' },
      ],
    },
    {
      id: 'lifecycle',
      label: 'Records are superseded, never edited',
      pattern: 'user',
      cols: 3,
      children: [
        { id: 'l-004', label: 'ADR-004', sub: 'nightly rebuild of orders', pattern: 'user', icon: 'file' },
        { id: 'l-change', label: 'Finance asks', sub: 'for 30-minute revenue', pattern: 'user', icon: 'bell' },
        { id: 'l-011', label: 'ADR-011', sub: 'supersedes ADR-004', pattern: 'user', icon: 'filecode' },
      ],
      edges: [
        { source: 'l-004', target: 'l-change' },
        { source: 'l-change', target: 'l-011' },
      ],
      flow: 'LR',
    },
  ],
  edges: [
    { source: 'adr', target: 'log', label: 'one of' },
    { source: 'log', target: 'parts', label: 'each one' },
    { source: 'parts', target: 'lifecycle', label: 'over time' },
  ],
}
