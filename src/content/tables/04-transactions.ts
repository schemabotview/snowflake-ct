import type { Section } from '../types'

export const transactions: Section = {
  id: 'transactions',
  title: 'Transactions, autocommit and DDL boundaries',
  scene: 'transaction-boundary',
  focus: 'executed',
  slide: `## A DDL statement ends your transaction

With **autocommit** on, each statement is its own transaction. \`BEGIN\` … \`COMMIT\` groups DML so it succeeds or fails **as one**.

### The trap
- Any **DDL** — \`CREATE\`, \`ALTER\`, \`DROP\` — **commits** the open transaction first
- Statements after it run in **autocommit**, one by one
- The final \`ROLLBACK\` finds **nothing** left to undo
- Changing \`AUTOCOMMIT\` itself also triggers a commit

### The fix
- Keep explicit transactions to **DML and queries** only
- Create tables **before** \`BEGIN\`, not in the middle
- Other sessions see a transaction's changes only **after commit**
- A client that disconnects mid-transaction has it **rolled back**`,
  narration:
    "Reloading one day of orders should be a single unit of work. Delete the day's rows, insert the corrected ones, and log the reload, so that either everything happens or nothing does. With autocommit on, which is the default, every statement is its own transaction. To group statements, you begin a transaction explicitly and finish it with commit or rollback. Now look at the script on the left. It begins a transaction, deletes and inserts, and then creates a log table. That create statement is data definition language, D D L, and in Snowflake any D D L statement first commits whatever transaction is open. So the delete and the insert are committed right there. The create runs as its own transaction. The log insert that follows runs in autocommit and commits on its own too. When the script reaches rollback, there is nothing left to roll back. What looked like one unit was actually three separate commits, and a failure halfway through would have left the day half reloaded. The fix is simple once you know the rule. Keep explicit transactions to data changes and queries, and create any tables before you begin. And remember that other sessions see a transaction's changes only once it commits, never part way through. Two smaller rules complete the picture: changing the autocommit setting itself triggers a commit, and if a client disconnects with a transaction still open, that transaction is rolled back.",
}
