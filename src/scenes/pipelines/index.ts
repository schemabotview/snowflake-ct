import type { Scene } from '@graphlearning/flow'
import { taskAnatomy } from './task-anatomy'
import { taskGraph } from './task-graph'
import { partialFailure } from './partial-failure'
import { dynamicLag } from './dynamic-lag'
import { refreshModes } from './refresh-modes'
import { chooseAutomation } from './choose-automation'
import { pipelineEvidence } from './pipeline-evidence'
import { externalOrchestration } from './external-orchestration'

// Course 7 — Pipeline Orchestration and Dynamic Tables.
export const pipelinesScenes: Scene[] = [
  taskAnatomy,
  taskGraph,
  partialFailure,
  dynamicLag,
  refreshModes,
  chooseAutomation,
  pipelineEvidence,
  externalOrchestration,
]
