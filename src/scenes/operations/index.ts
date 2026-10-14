import type { Scene } from '@graphlearning/flow'
import { environments } from './environments'
import { deployOrder } from './deploy-order'
import { releaseChecks } from './release-checks'
import { migrationRollback } from './migration-rollback'
import { incidentDiagnosis } from './incident-diagnosis'
import { telemetrySources } from './telemetry-sources'
import { recoveryLayers } from './recovery-layers'
import { failoverPlan } from './failover-plan'
import { securityRunbook } from './security-runbook'

// Course 10 — Delivery, Operations, and Recovery.
export const operationsScenes: Scene[] = [
  environments,
  deployOrder,
  releaseChecks,
  migrationRollback,
  incidentDiagnosis,
  telemetrySources,
  recoveryLayers,
  failoverPlan,
  securityRunbook,
]
