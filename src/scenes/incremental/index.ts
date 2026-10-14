import type { Scene } from '@graphlearning/flow'
import { cdcVsStream } from './cdc-vs-stream'
import { offsetTimeline } from './offset-timeline'
import { consumeOffsets } from './consume-offsets'
import { streamOutput } from './stream-output'
import { incrementalMerge } from './incremental-merge'
import { lateArrivals } from './late-arrivals'
import { recoveryDecisions } from './recovery-decisions'

// Course 6 — Ongoing Changes and Incremental Correctness.
export const incrementalScenes: Scene[] = [
  cdcVsStream,
  offsetTimeline,
  consumeOffsets,
  streamOutput,
  incrementalMerge,
  lateArrivals,
  recoveryDecisions,
]
