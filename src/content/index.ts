import { platform } from './platform'
import { access } from './access'
import { tables } from './tables'
import { loading } from './loading'
import { transform } from './transform'
import { incremental } from './incremental'
import { pipelines } from './pipelines'
import { performance } from './performance'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [platform.id]: platform,
  [access.id]: access,
  [tables.id]: tables,
  [loading.id]: loading,
  [transform.id]: transform,
  [incremental.id]: incremental,
  [pipelines.id]: pipelines,
  [performance.id]: performance,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
