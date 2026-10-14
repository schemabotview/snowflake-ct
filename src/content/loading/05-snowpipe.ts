import type { Section } from '../types'

export const snowpipe: Section = {
  id: 'snowpipe',
  title: 'Snowpipe, notifications and operational evidence',
  scene: 'snowpipe-flow',
  focus: 'sp-pipe',
  slide: `## Files load themselves as they land

A **pipe** wraps a COPY statement. With \`AUTO_INGEST\`, a cloud **event notification** triggers it for each new file, on **serverless** compute.

### How it differs from scheduled COPY
- Minutes of latency instead of a daily batch, and **no warehouse** to manage
- Billed per GB ingested: 0.0037 credits/GB under current simplified pricing
- Load metadata kept **14 days**, per pipe; \`ON_ERROR\` defaults to \`SKIP_FILE\`

### Operational evidence
- \`SYSTEM$PIPE_STATUS\` — pending files and execution state
- \`COPY_HISTORY\` — each file, its rows, its errors
- \`PIPE_USAGE_HISTORY\` — credits and bytes billed

### Watch for the quiet failures
- A missed event, a skipped file or a paused pipe raises **no alarm** by itself`,
  narration:
    "A daily copy is fine for a daily file, but the customer app wants order status within minutes. Snowpipe closes that gap. A pipe is simply a copy statement wrapped in an object. With auto ingest turned on, your cloud storage sends an event notification whenever a new file lands, Snowflake queues it, and the pipe loads that file on serverless compute that Snowflake supplies. There is no warehouse to size or schedule. Under Snowflake's current simplified pricing, Snowpipe is billed per gigabyte ingested, at a published rate of zero point zero zero three seven credits per gigabyte, so check the current rate for your account. A few behaviours differ from bulk copy. A pipe keeps its own load metadata for fourteen days rather than sixty-four. And its default on error behaviour is to skip a file containing errors, rather than abort. Because Snowpipe runs on its own, you need evidence that it is working. The pipe status function shows how many files are pending and whether the pipe is running. Copy history shows every file it loaded, with row counts and errors. And pipe usage history shows the credits and bytes billed. Watch for the quiet failures in particular. A missed notification, a skipped file, or a paused pipe raises no alarm by itself, so somebody has to be looking.",
}
