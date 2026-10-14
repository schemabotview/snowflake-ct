import type { Course } from '../types'
import { environmentsSection } from './01-environments'
import { deploymentIdentity } from './02-deployment-identity'
import { releaseChecksSection } from './03-release-checks'
import { migrationRollbackSection } from './04-migration-rollback'
import { incidentDiagnosisSection } from './05-incident-diagnosis'
import { telemetry } from './06-telemetry'
import { recovery } from './07-recovery'
import { replicationFailover } from './08-replication-failover'
import { incidentRunbooks } from './09-incident-runbooks'

// Chapter 10 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const operations: Course = {
  id: 'operations',
  title: 'Delivery, Operations, and Recovery',
  sections: [
    environmentsSection,
    deploymentIdentity,
    releaseChecksSection,
    migrationRollbackSection,
    incidentDiagnosisSection,
    telemetry,
    recovery,
    replicationFailover,
    incidentRunbooks,
  ],
}
