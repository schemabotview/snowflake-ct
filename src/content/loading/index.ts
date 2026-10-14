import type { Course } from '../types'
import { stagesFormats } from './01-stages-formats'
import { copyInto } from './02-copy-into'
import { validationQuarantine } from './03-validation-quarantine'
import { loadHistory } from './04-load-history'
import { snowpipe } from './05-snowpipe'
import { snowpipeStreaming } from './06-snowpipe-streaming'
import { schemaEvolution } from './07-schema-evolution'
import { reconcileUnload } from './08-reconcile-unload'

// Chapter 4 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const loading: Course = {
  id: 'loading',
  title: 'Loading, Unloading, and Reconciliation',
  sections: [
    stagesFormats,
    copyInto,
    validationQuarantine,
    loadHistory,
    snowpipe,
    snowpipeStreaming,
    schemaEvolution,
    reconcileUnload,
  ],
}
