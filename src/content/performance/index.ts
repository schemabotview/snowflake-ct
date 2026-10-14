import type { Course } from '../types'
import { queryProfile } from './01-query-profile'
import { pruning } from './02-pruning'
import { caches } from './03-caches'
import { sizingConcurrency } from './04-sizing-concurrency'
import { spillSkewJoinsSection } from './05-spill-skew-joins'
import { physicalOptionsSection } from './06-physical-options'
import { costSourcesSection } from './07-cost-sources'
import { costControlsSection } from './08-cost-controls'
import { evidenceLed } from './09-evidence-led'

// Chapter 8 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const performance: Course = {
  id: 'performance',
  title: 'Performance and Cost Reasoning',
  sections: [
    queryProfile,
    pruning,
    caches,
    sizingConcurrency,
    spillSkewJoinsSection,
    physicalOptionsSection,
    costSourcesSection,
    costControlsSection,
    evidenceLed,
  ],
}
