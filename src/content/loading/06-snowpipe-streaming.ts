import type { Section } from '../types'

export const snowpipeStreaming: Section = {
  id: 'snowpipe-streaming',
  title: 'Snowpipe Streaming and choosing a path',
  scene: 'streaming-channels',
  focus: 'offsets',
  slide: `## Rows, not files

**Snowpipe Streaming** writes rows straight from an application or Kafka through an SDK — no files, latency in **seconds**.

### How progress is tracked
- The client writes through **channels**; in the high-performance architecture, channels open against a **PIPE** object
- Each committed batch carries an **offset token** the client chose
- After a crash, resume from the **last committed** offset, not the last sent

### Two architectures
- **High-performance**: PIPE object, billed per uncompressed GB
- **Classic**: channels on tables; supported, with deprecation planned

### Choosing a path
- Scheduled files → **COPY**; files as they land → **Snowpipe**; event rows → **Streaming**`,
  narration:
    "Snowpipe still works in files. When the source is a stream of events, from an application or a Kafka topic, writing files first only adds delay. Snowpipe Streaming removes that step. A client, using Snowflake's ingest SDK, writes rows directly, and they become queryable within seconds. The client writes through channels. In the current high-performance architecture, each channel is opened against a pipe object, which defines the target table and any transformation. Every batch the client sends carries an offset token, a position the client chooses, such as a Kafka offset. Snowflake records the last offset it has committed for each channel. That record is what makes recovery correct. Suppose the client crashes. Channel zero had sent up to five thousand one hundred and twenty, but only five thousand one hundred was committed. On restart, the client asks for the last committed offset and resumes from the next one, so nothing is lost and nothing is written twice. Resuming from the last sent offset would silently drop twenty events. There are two architectures. The high-performance one uses the pipe object and is billed per uncompressed gigabyte. The classic one opens channels on tables directly; it is supported, but Snowflake plans to deprecate it. The choice of path follows the data: scheduled files suit copy, files as they land suit Snowpipe, and event rows suit streaming.",
}
