import type { Course } from '../types'
import { queryGrain } from './01-query-grain'
import { ctesWindows } from './02-ctes-windows'
import { variantFlatten } from './03-variant-flatten'
import { timeAndNumbers } from './04-time-and-numbers'
import { viewsServing } from './05-views-serving'
import { dimensionalModelling } from './06-dimensional-modelling'
import { snowpark } from './07-snowpark'
import { proceduresUdfs } from './08-procedures-udfs'

// Chapter 5 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const transform: Course = {
  id: 'transform',
  title: 'Querying, Transformation, and Analytical Serving',
  sections: [
    queryGrain,
    ctesWindows,
    variantFlatten,
    timeAndNumbers,
    viewsServing,
    dimensionalModelling,
    snowpark,
    proceduresUdfs,
  ],
}
