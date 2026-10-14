import type { Section } from '../types'

export const timeAndNumbers: Section = {
  id: 'time-and-numbers',
  title: 'Timestamps, time zones and numeric precision',
  scene: 'time-numbers',
  focus: 'tz-rows',
  slide: `## Which day, and how exact

### Time zones decide the business date
- Events are stored as **UTC** in \`TIMESTAMP_NTZ\`
- 23:30 UTC on 1 October is **00:30 on 2 October** in London (BST)
- Revenue "for 2 October" must convert **before** taking the date
- Store UTC; convert at the **edge**, once

### Defaults to override, not inherit
- Plain \`TIMESTAMP\` means \`TIMESTAMP_NTZ\` unless remapped
- The session \`TIMEZONE\` defaults to **America/Los_Angeles**
- Set the account's time zone, and name it in every conversion

### Exact numbers for money
- \`FLOAT\` is approximate: \`0.1 + 0.2 = 0.3\` is **FALSE**
- \`NUMBER(10,2)\` is exact — use it for every amount
- Division adds scale: \`10 / 3\` returns \`3.333333\`, not 3`,
  narration:
    "Two kinds of conversion cause more wrong reports than almost anything else: time zones and number types. Start with time. Our events are stored in UTC, in a timestamp without a time zone. An order placed at half past midnight in London on the second of October happened at half past eleven on the first, in UTC, because London is one hour ahead during summer time. Take the date of the stored value and that order lands on the first. The business, though, counts it on the second. The fix is to convert to the business's time zone first, then take the date. Defaults make this worse if you don't override them. A plain timestamp column means timestamp without time zone unless someone has changed the mapping. And the session time zone, which drives local timestamp types and functions such as current timestamp, defaults to Los Angeles. A London retailer who never sets it will see times eight hours out. So set the account's time zone deliberately, and name time zones explicitly in every conversion. Numbers have a similar trap. Float is a binary approximation, so point one plus point two is not exactly point three, and an equality test fails. Number with a fixed scale is exact decimal arithmetic. Every money column belongs in an exact number type. And note that division adds decimal places: ten divided by three returns three point three three three three three three, not three.",
}
