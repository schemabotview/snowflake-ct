import type { Scene } from '@graphlearning/flow'

// §6 — rows, not files: a client writes to channels opened against a PIPE (left, top to bottom),
// and a committed offset token is where it resumes after a crash (right).
export const streamingChannels: Scene = {
  id: 'streaming-channels',
  title: 'Rows in seconds, resumed by offset',
  flow: 'LR',
  padding: 0.08,
  nodes: [
    {
      id: 'stream-path',
      label: 'High-performance path',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'st-source', label: 'Order events', sub: 'app or Kafka topic', pattern: 'external', icon: 'zap' },
        { id: 'st-client', label: 'Ingest SDK', sub: 'client you run', pattern: 'service', icon: 'code' },
        { id: 'st-pipe', label: 'EVENTS_PIPE', sub: 'PIPE object', pattern: 'service', icon: 'workflow' },
        { id: 'st-table', label: 'ORDER_EVENTS', sub: 'RAW, seconds later', pattern: 'storage', icon: 'table' },
      ],
      edges: [
        { source: 'st-source', target: 'st-client' },
        { source: 'st-client', target: 'st-pipe', label: 'channels' },
        { source: 'st-pipe', target: 'st-table' },
      ],
    },
    {
      id: 'stream-facts',
      label: 'Progress, architectures, choices',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'offsets',
          kind: 'table',
          label: 'After a client crash — per channel',
          headers: ['Channel', 'Last sent', 'Last committed', 'Resume from'],
          values: [
            ['orders-0', '5 120', '5 100', '5 101'],
            ['orders-1', '4 980', '4 980', '4 981'],
          ],
        },
        {
          id: 'architectures',
          kind: 'table',
          label: 'Two architectures',
          headers: ['', 'High-performance', 'Classic'],
          values: [
            ['Channels open on', 'a PIPE object', 'the table'],
            ['Billed', 'per uncompressed GB', 'compute + clients'],
            ['Status', 'current', 'deprecation planned'],
          ],
        },
        {
          id: 'choose-path',
          label: 'Choosing an ingestion path',
          pattern: 'user',
          cols: 1,
          children: [
            { id: 'ch-copy', label: 'COPY', sub: 'scheduled batches', pattern: 'user', icon: 'calendar' },
            { id: 'ch-pipe', label: 'Snowpipe', sub: 'files as they land', pattern: 'user', icon: 'file' },
            { id: 'ch-stream', label: 'Streaming', sub: 'rows, seconds', pattern: 'user', icon: 'zap' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'stream-path', target: 'stream-facts', label: 'per channel' }],
}
