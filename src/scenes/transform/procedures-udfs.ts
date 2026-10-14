import type { Scene } from '@graphlearning/flow'

// §8 — a UDF returns a value inside a query; a procedure does work, such as ch.3's day reload, and
// runs with its owner's privileges unless declared otherwise.
export const proceduresUdfs: Scene = {
  id: 'procedures-udfs',
  title: 'Functions return values, procedures do work',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'udf-proc-code',
      kind: 'code',
      filename: 'routines.sql',
      label: `CREATE FUNCTION retail.sales.net_amount(total NUMBER(10,2), status VARCHAR)
  RETURNS NUMBER(10,2)
  AS $$ IFF(status = 'CANCELLED', 0, total) $$;          -- usable inside SELECT

CREATE PROCEDURE retail.sales.reload_day(d DATE)
  RETURNS VARCHAR  LANGUAGE SQL
  EXECUTE AS OWNER                                       -- RETAIL_ADMIN's privileges
AS $$
BEGIN
  BEGIN TRANSACTION;
    DELETE FROM retail.sales.orders WHERE order_date = :d;
    INSERT INTO retail.sales.orders SELECT ... FROM retail.raw.orders WHERE ...;
  COMMIT;
  RETURN 'reloaded';
END;
$$;`,
    },
    {
      id: 'udf-vs-proc',
      kind: 'table',
      label: 'UDF or procedure',
      headers: ['', 'UDF', 'Procedure'],
      values: [
        ['Called by', 'any SQL expression', 'CALL'],
        ['Can change data', 'no: queries only', 'yes: DML and DDL'],
        ['Returns', 'a value per row', 'one value, to the caller'],
      ],
    },
    {
      id: 'rights',
      label: 'Whose privileges a procedure uses',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-owner', label: "Owner's rights", sub: 'default: a narrow, fixed capability', pattern: 'storage', icon: 'key' },
        { id: 'r-caller', label: "Caller's rights", sub: 'only what the caller may do', pattern: 'service', icon: 'usercheck' },
      ],
    },
  ],
  edges: [
    { source: 'udf-proc-code', target: 'udf-vs-proc' },
    { source: 'udf-vs-proc', target: 'rights', label: 'and for procedures' },
  ],
}
