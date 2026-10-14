import type { Scene } from '@graphlearning/flow'

// §7 — three source changes against an evolving table: an added column evolves, a renamed column
// silently evolves into the wrong shape, and a changed type fails.
export const schemaChange: Scene = {
  id: 'schema-change',
  title: 'Not every source change is evolution',
  flow: 'TB',
  padding: 0.1,
  nodes: [
    {
      id: 'evolve-code',
      kind: 'code',
      filename: 'evolve.sql',
      label: `ALTER TABLE retail.raw.orders SET ENABLE_SCHEMA_EVOLUTION = TRUE;

COPY INTO retail.raw.orders FROM @retail.raw.landing
  FILE_FORMAT = (TYPE = CSV  PARSE_HEADER = TRUE)
  MATCH_BY_COLUMN_NAME = CASE_INSENSITIVE;   -- required for evolution`,
    },
    {
      id: 'changes',
      kind: 'table',
      label: 'Three changes the source made in October',
      headers: ['Change in the file', 'What the load does', 'Verdict'],
      values: [
        ['adds SALES_CHANNEL', 'adds the column', 'safe evolution'],
        ['renames ORDER_TOTAL → TOTAL_AMOUNT', 'adds TOTAL_AMOUNT, drops NOT NULL on ORDER_TOTAL', 'silent break'],
        ['ORDER_TOTAL becomes "89.50 GBP"', 'conversion error, load rejects', 'loud break'],
      ],
    },
    {
      id: 'contract-response',
      label: 'What to do about it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'resp-watch', label: 'Watch evolution', sub: 'evolution records', pattern: 'service', icon: 'search' },
        { id: 'resp-test', label: 'Test NULL rates', sub: 'ORDER_TOTAL now null?', pattern: 'warn', icon: 'gauge' },
        { id: 'resp-contract', label: 'Agree changes', sub: 'with the source owner', pattern: 'user', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'evolve-code', target: 'changes', label: 'then the source changes' },
    { source: 'changes', target: 'contract-response' },
  ],
}
