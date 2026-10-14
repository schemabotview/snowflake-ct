import type { Course } from '../types'
import { tasks } from './01-tasks'
import { taskGraphs } from './02-task-graphs'
import { retriesFailure } from './03-retries-failure'
import { dynamicTables } from './04-dynamic-tables'
import { refreshModesSection } from './05-refresh-modes'
import { choosingAutomation } from './06-choosing-automation'
import { qualityEvidence } from './07-quality-evidence'
import { externalOrchestrationSection } from './08-external-orchestration'

// Chapter 7 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const pipelines: Course = {
  id: 'pipelines',
  title: 'Pipeline Orchestration and Dynamic Tables',
  sections: [
    tasks,
    taskGraphs,
    retriesFailure,
    dynamicTables,
    refreshModesSection,
    choosingAutomation,
    qualityEvidence,
    externalOrchestrationSection,
  ],
}
