import type { Course } from '../types'
import { cdcAndStreams } from './01-cdc-and-streams'
import { offsetsRetention } from './02-offsets-retention'
import { consumingStreams } from './03-consuming-streams'
import { updateDeleteRepresentation } from './04-update-delete-representation'
import { incrementalMerge } from './05-incremental-merge'
import { lateOutOfOrder } from './06-late-out-of-order'
import { replayRebuild } from './07-replay-rebuild'

// Chapter 6 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const incremental: Course = {
  id: 'incremental',
  title: 'Ongoing Changes and Incremental Correctness',
  sections: [
    cdcAndStreams,
    offsetsRetention,
    consumingStreams,
    updateDeleteRepresentation,
    incrementalMerge,
    lateOutOfOrder,
    replayRebuild,
  ],
}
