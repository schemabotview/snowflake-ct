import type { Course } from '../types'
import { workloadRequirements } from './01-workload-requirements'
import { threeLayers } from './02-three-layers'
import { accountsRegionsEditions } from './03-accounts-regions-editions'
import { warehousesSessions } from './04-warehouses-sessions'
import { firstQuery } from './05-first-query'
import { costAndLifecycle } from './06-cost-and-lifecycle'

// Chapter 1 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const platform: Course = {
  id: 'platform',
  title: 'Platform Foundations and a First Query',
  sections: [workloadRequirements, threeLayers, accountsRegionsEditions, warehousesSessions, firstQuery, costAndLifecycle],
}
