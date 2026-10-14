import type { Section } from '../types'

export const copyInto: Section = {
  id: 'copy-into',
  title: 'COPY INTO and explicit mapping',
  scene: 'copy-mapping',
  focus: 'copy-code',
  slide: `## Name every column, convert on purpose

\`COPY INTO\` bulk-loads staged files using a warehouse. Selecting \`$1 … $n\` maps file **positions** to table **columns** explicitly.

### Conversions, made visible
- Dates arrive as \`01/10/2026\`: the file format's \`DATE_FORMAT\` reads them
- \`UPPER($4)\` normalises status casing before it spreads
- The column type converts \`89.50\` to \`NUMBER(10,2)\`

### Keep lineage on every row
- \`METADATA$FILENAME\` and \`METADATA$FILE_ROW_NUMBER\` record **where** each row came from
- A wrong value can be traced back to its **file and line**
- \`VALIDATION_MODE\` can't test a COPY that **transforms** — validate a plain load first

### Why not rely on column order
- A source that reorders columns would load wrong values **without an error**`,
  narration:
    "With files staged, copy into loads them, using a warehouse you choose. The simplest form copies each file column into the table column in the same position, but that silently assumes the file and the table agree forever. The safer pattern names everything. Inside copy, a select over the stage refers to file fields by position, dollar one, dollar two and so on, and the column list says exactly which table column each one fills. That is also where conversions become visible. Our source writes dates as day, month, year, so the file format's date setting tells Snowflake how to read them. Status arrives in lower case, so upper normalises it at the door, before inconsistent casing spreads into every report. And the total arrives as text, which the table's numeric type converts to an exact two-decimal amount. Notice the last two columns. Every file row also carries metadata: the name of the file it came from, and its row number within that file. Storing them costs almost nothing, and when someone questions a value months later, you can trace it straight back to its file and line. Why go to this trouble rather than rely on column order? Because a source that one day swaps two columns would otherwise load wrong values without a single error. One practical note: validation mode can't test a copy that transforms data, so validate a plain load of the same files first.",
}
