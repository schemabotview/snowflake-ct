import type { Scene } from '@graphlearning/flow'
import { stageTypes } from './stage-types'
import { copyMapping } from './copy-mapping'
import { rejectedRows } from './rejected-rows'
import { fileIdentity } from './file-identity'
import { snowpipeFlow } from './snowpipe-flow'
import { streamingChannels } from './streaming-channels'
import { schemaChange } from './schema-change'
import { reconcileUnload } from './reconcile-unload'

// Course 4 — Loading, Unloading, and Reconciliation.
export const loadingScenes: Scene[] = [
  stageTypes,
  copyMapping,
  rejectedRows,
  fileIdentity,
  snowpipeFlow,
  streamingChannels,
  schemaChange,
  reconcileUnload,
]
