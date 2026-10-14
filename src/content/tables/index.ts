import type { Course } from '../types'
import { dataContracts } from './01-data-contracts'
import { constraints } from './02-constraints'
import { tableLifecycle } from './03-table-lifecycle'
import { transactions } from './04-transactions'
import { merge } from './05-merge'
import { timeTravel } from './06-time-travel'
import { zeroCopyClones } from './07-zero-copy-clones'
import { tableTypes } from './08-table-types'

// Chapter 3 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const tables: Course = {
  id: 'tables',
  title: 'Tables and Reliable Data Changes',
  sections: [dataContracts, constraints, tableLifecycle, transactions, merge, timeTravel, zeroCopyClones, tableTypes],
}
