import type { Course } from '../types'
import { productRequirementsSection } from './01-product-requirements'
import { architectureOptionsSection } from './02-architecture-options'
import { stagedCutoverSection } from './03-staged-cutover'
import { decisionRecordsSection } from './04-decision-records'
import { continuationSection } from './05-continuation'

// Chapter 11 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const architecture: Course = {
  id: 'architecture',
  title: 'Integrated Architecture and Evolution',
  sections: [
    productRequirementsSection,
    architectureOptionsSection,
    stagedCutoverSection,
    decisionRecordsSection,
    continuationSection,
  ],
}
