import type { Scene } from '@graphlearning/flow'
import { grainAmplification } from './grain-amplification'
import { windowLatest } from './window-latest'
import { variantFlatten } from './variant-flatten'
import { timeNumbers } from './time-numbers'
import { servingViews } from './serving-views'
import { dimensionalModel } from './dimensional-model'
import { snowparkActions } from './snowpark-actions'
import { proceduresUdfs } from './procedures-udfs'

// Course 5 — Querying, Transformation, and Analytical Serving.
export const transformScenes: Scene[] = [
  grainAmplification,
  windowLatest,
  variantFlatten,
  timeNumbers,
  servingViews,
  dimensionalModel,
  snowparkActions,
  proceduresUdfs,
]
