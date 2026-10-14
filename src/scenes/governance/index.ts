import type { Scene } from '@graphlearning/flow'
import { classifyTag } from './classify-tag'
import { policyResults } from './policy-results'
import { auditEvidence } from './audit-evidence'
import { shareFlow } from './share-flow'
import { distributionOptions } from './distribution-options'
import { consumerContract } from './consumer-contract'
import { policyTesting } from './policy-testing'

// Course 9 — Governance, Sharing, and Consumption.
export const governanceScenes: Scene[] = [
  classifyTag,
  policyResults,
  auditEvidence,
  shareFlow,
  distributionOptions,
  consumerContract,
  policyTesting,
]
