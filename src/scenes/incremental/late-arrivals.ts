import type { Scene } from '@graphlearning/flow'

// §6 — event 101 (Leeds) is delayed and lands after 103 (York). Applying in arrival order gets
// C-207 wrong; ordering by the source sequence gets it right. Tombstones and business time follow.
export const lateArrivals: Scene = {
  id: 'late-arrivals',
  title: 'Arrival order is not source order',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'arrival',
      kind: 'table',
      label: 'Events for C-207 as they arrived',
      headers: ['LOADED_AT', 'SOURCE_SEQ', 'CITY', 'CHANGED_AT'],
      values: [
        ['11:35', '103', 'York', '11:30'],
        ['11:45', '101', 'Leeds', '09:00'],
      ],
    },
    {
      id: 'rules',
      kind: 'table',
      label: 'Which rule decides C-207\'s city',
      headers: ['Rule', 'Result', 'Correct?'],
      values: [
        ['last loaded wins', 'Leeds', 'no — older change won'],
        ['highest SOURCE_SEQ wins', 'York', 'yes'],
        ['latest CHANGED_AT wins', 'York', 'yes, if source clocks agree'],
      ],
    },
    {
      id: 'more-cases',
      label: 'Two more cases the model must handle',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'tombstone', label: 'Tombstone', sub: 'C-311 deleted: remove or flag IS_DELETED', pattern: 'warn', icon: 'trash' },
        { id: 'business-time', label: 'Business time', sub: 'type-2 rows dated by CHANGED_AT', pattern: 'storage', icon: 'calendar' },
      ],
    },
  ],
  edges: [
    { source: 'arrival', target: 'rules', label: 'applied by' },
    { source: 'rules', target: 'more-cases', label: 'and beyond updates' },
  ],
}
