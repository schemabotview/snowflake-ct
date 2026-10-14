import type { Section } from '../types'

export const dataContracts: Section = {
  id: 'data-contracts',
  title: 'Types, nullability and data contracts',
  scene: 'data-contract',
  focus: 'promises',
  slide: `## A table is a promise about its rows

Before a single row loads, decide what each column **guarantees** — and what will **keep** that guarantee when the source misbehaves.

### Let the type do the work
- \`NUMBER(10,2)\` for money: exact, two decimals, no float rounding
- \`DATE\` and \`TIMESTAMP_NTZ\`, never dates stored as text
- A bad value fails **at load**, not inside a report next week

### Nullability and the rest
- \`NOT NULL\` says a column must always be present — and Snowflake enforces it
- "One row per order" is a promise **no type** can keep on its own
- Write the contract down: column, promise, and who keeps it
- A \`CHECK\` can hold a status to its **four allowed values** — next section`,
  narration:
    "Let's start this chapter with the table itself, because a table is a promise about its rows. Every column in our cleaned orders table makes one. The order ID is always present and identifies exactly one order. The order date is a real date. The total is an amount of money with two decimal places. The status is one of a small set of values. Before any data loads, it pays to write those promises down, along with what will actually keep each one when a source system misbehaves. The cheapest guard is the data type. Money goes in an exact number type with fixed decimals, not a floating-point one that rounds. Dates go in date and timestamp types, never in text columns. Then a bad value fails at the door. Try to insert the text N A into a numeric column and the statement is rejected immediately. Put the same text in a varchar column and it loads without a murmur, then breaks a sum in next week's report, far from where it came from. Not null is the next guard, and Snowflake enforces it. But notice that one row per order is a promise no type can keep by itself. Something has to check it, and the next section shows why that something is usually you.",
}
