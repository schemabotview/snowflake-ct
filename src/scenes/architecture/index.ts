import type { Scene } from '@graphlearning/flow'
import { productRequirements } from './product-requirements'
import { architectureOptions } from './architecture-options'
import { stagedCutover } from './staged-cutover'
import { decisionRecords } from './decision-records'
import { continuation } from './continuation'

// Course 11 — Integrated Architecture and Evolution.
export const architectureScenes: Scene[] = [
  productRequirements,
  architectureOptions,
  stagedCutover,
  decisionRecords,
  continuation,
]
