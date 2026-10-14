import type { Course } from '../types'
import { classificationTags } from './01-classification-tags'
import { maskingRowAccess } from './02-masking-row-access'
import { accessHistory } from './03-access-history'
import { secureSharing } from './04-secure-sharing'
import { listingsDistribution } from './05-listings-distribution'
import { consumerContracts } from './06-consumer-contracts'
import { policyTestingSection } from './07-policy-testing'

// Chapter 9 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const governance: Course = {
  id: 'governance',
  title: 'Governance, Sharing, and Consumption',
  sections: [
    classificationTags,
    maskingRowAccess,
    accessHistory,
    secureSharing,
    listingsDistribution,
    consumerContracts,
    policyTestingSection,
  ],
}
