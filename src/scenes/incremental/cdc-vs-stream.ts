import type { Scene } from '@graphlearning/flow'

// §1 — the CRM's change feed lands every event in an append-only log; a Snowflake stream on that
// table then exposes what is new since its offset. Two different things, both called "changes".
export const cdcVsStream: Scene = {
  id: 'cdc-vs-stream',
  title: 'Source change capture, then a Snowflake stream',
  flow: 'LR',
  padding: 0.06,
  nodes: [
    {
      id: 'cdc-path',
      label: 'Customer changes, end to end',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'crm', label: 'CRM database', sub: 'source of truth', pattern: 'external', icon: 'database' },
        { id: 'cdc-tool', label: 'CDC tool', sub: 'reads the source log', pattern: 'external', icon: 'scroll' },
        { id: 'change-log', label: 'Change log', sub: 'RAW.CUSTOMER_CHANGES', pattern: 'storage', icon: 'table' },
        { id: 'change-stream', label: 'Stream', sub: 'what is new since offset', pattern: 'service', icon: 'waves' },
      ],
      edges: [
        { source: 'crm', target: 'cdc-tool' },
        { source: 'cdc-tool', target: 'change-log', label: 'lands' },
        { source: 'change-log', target: 'change-stream', label: 'tracks' },
      ],
    },
    {
      id: 'cdc-detail',
      label: 'The events, and what each kind keeps',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'events',
          kind: 'table',
          label: 'RAW.CUSTOMER_CHANGES — 2 October',
          headers: ['SOURCE_SEQ', 'OP', 'CUSTOMER_ID', 'CITY', 'CHANGED_AT'],
          values: [
            ['101', 'U', 'C-207', 'Leeds', '09:00'],
            ['102', 'I', 'C-388', 'Bath', '10:15'],
            ['103', 'U', 'C-207', 'York', '11:30'],
            ['104', 'D', 'C-311', '—', '12:00'],
          ],
        },
        {
          id: 'compare',
          kind: 'table',
          label: 'Two kinds of "changes"',
          headers: ['', 'Source CDC', 'Snowflake stream'],
          values: [
            ['Captures', 'every change, in order', 'net change since offset'],
            ['Stores', 'events, as rows', 'an offset only'],
            ['History', 'as long as you keep it', 'table retention only'],
            ['An update is', 'one event', 'a DELETE + INSERT pair'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'cdc-path', target: 'cdc-detail', label: 'landed as' }],
}
