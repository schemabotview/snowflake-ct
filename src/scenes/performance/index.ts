import type { Scene } from '@graphlearning/flow'
import { profileReading } from './profile-reading'
import { pruningScan } from './pruning-scan'
import { cacheMeasurement } from './cache-measurement'
import { scaleUpOut } from './scale-up-out'
import { spillSkewJoins } from './spill-skew-joins'
import { physicalOptions } from './physical-options'
import { costSources } from './cost-sources'
import { costControls } from './cost-controls'
import { optimiseEvidence } from './optimise-evidence'

// Course 8 — Performance and Cost Reasoning.
export const performanceScenes: Scene[] = [
  profileReading,
  pruningScan,
  cacheMeasurement,
  scaleUpOut,
  spillSkewJoins,
  physicalOptions,
  costSources,
  costControls,
  optimiseEvidence,
]
