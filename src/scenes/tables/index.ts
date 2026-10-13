import type { Scene } from '@graphlearning/flow'
import { dataContract } from './data-contract'
import { constraintEnforcement } from './constraint-enforcement'
import { tableLifecycle } from './table-lifecycle'
import { transactionBoundary } from './transaction-boundary'
import { mergeDedup } from './merge-dedup'
import { timeTravel } from './time-travel'
import { cloneStorage } from './clone-storage'
import { tableTypes } from './table-types'

// Course 3 — Tables and Reliable Data Changes.
export const tablesScenes: Scene[] = [
  dataContract,
  constraintEnforcement,
  tableLifecycle,
  transactionBoundary,
  mergeDedup,
  timeTravel,
  cloneStorage,
  tableTypes,
]
