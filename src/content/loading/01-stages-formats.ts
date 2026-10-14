import type { Section } from '../types'

export const stagesFormats: Section = {
  id: 'stages-formats',
  title: 'Stages, file formats and access paths',
  scene: 'stage-types',
  focus: 'external-stages',
  slide: `## Files wait in a stage

A **stage** is a named location for files on their way in or out. A **file format** tells Snowflake how to read them.

### Four kinds of stage
- **User** \`@~\` and **table** \`@%orders\` stages exist automatically
- A **named internal** stage keeps files in Snowflake storage, shared by grants
- A **named external** stage points at your bucket through an **integration**

### The retail landing path
- The source drops one CSV a day into \`retailco-landing/orders/\`
- \`@RAW.LANDING\` reads it with \`S3_RETAIL_INT\` — chapter 2's access chain
- \`LIST\` shows what is waiting before anything loads

### Put parsing rules in one place
- A **named file format** keeps delimiter, header, date and NULL rules consistent`,
  narration:
    "Data rarely arrives as rows. It arrives as files, and before Snowflake can load a file, the file has to wait somewhere Snowflake can read it. That place is a stage. There are four kinds. Every user has a personal stage, and every table has a stage of its own; both exist automatically and suit small, one-off loads. A named internal stage keeps files in Snowflake's own storage and can be shared with whichever roles you grant. And a named external stage points at your own cloud storage, through the storage integration we built in chapter two. That last kind is our retailer's landing path. The order system drops one CSV file a day into the landing bucket, and the landing stage in the raw schema reads it. Before loading anything, list the stage. It shows exactly which files are waiting, their sizes, and when they changed. Here there are two: the daily file, and a second one called orders resend that arrived a few hours later. Hold on to that second file; it matters in section four. Finally, a stage holds files, but it does not say how to read them. That is the job of a file format: the delimiter, whether there is a header, how dates are written, and which values mean null. Defining it once, as a named object, keeps every load reading the same file in the same way.",
}
