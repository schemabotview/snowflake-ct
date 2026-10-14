import type { Section } from '../types'

export const proceduresUdfs: Section = {
  id: 'procedures-udfs',
  title: 'Procedures, UDFs and execution rights',
  scene: 'procedures-udfs',
  focus: 'rights',
  slide: `## Functions return values, procedures do work

A **UDF** computes a value inside any query. A **stored procedure** runs steps — including DML and DDL — when you \`CALL\` it.

### Choosing between them
- \`NET_AMOUNT\` is a UDF: \`SELECT net_amount(order_total, order_status)\`
- \`RELOAD_DAY\` is a procedure: it deletes and inserts in one transaction
- A UDF **cannot** change data; a procedure's result can't sit in a \`SELECT\`

### Whose privileges a procedure uses
- **Owner's rights** (the default): runs as \`RETAIL_ADMIN\`, so \`ANALYST\` can reload a day without DELETE on \`ORDERS\`
- **Caller's rights**: runs with the caller's own privileges and session
- Owner's rights grants a **fixed capability** — never build SQL from caller input`,
  narration:
    "The last tools in this chapter package logic so it can be reused. A user-defined function computes a value, and it can be used anywhere an expression can, inside a select or a where clause. Net amount is one: it returns zero for cancelled orders and the total otherwise. What a UDF cannot do is change data; it runs queries only. A stored procedure is the opposite. You call it, it runs a sequence of steps, including inserts, deletes and even D D L, and it returns a single value to the caller, not a value per row. Reload day is a procedure. It wraps chapter three's delete and insert in one explicit transaction, written correctly this time, with no D D L in the middle. Procedures raise a question functions don't: whose privileges do they use? By default, a procedure runs with owner's rights, meaning the privileges of the role that owns it, here retail admin. That lets us grant the analyst role permission to call reload day without ever granting it delete on orders: a narrow, fixed capability. A caller's rights procedure runs with the caller's own privileges and can see their session. Owner's rights is powerful, so never build SQL from a caller's input inside one. These building blocks are what chapter seven automates into pipelines.",
}
