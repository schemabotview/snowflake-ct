import type { Course } from '../types'
import { objectHierarchy } from './01-object-hierarchy'
import { nameResolution } from './02-name-resolution'
import { usersAuthentication } from './03-users-authentication'
import { rolesInheritance } from './04-roles-inheritance'
import { privilegesOwnership } from './05-privileges-ownership'
import { databaseRoles } from './06-database-roles'
import { managedAccess } from './07-managed-access'
import { integrationsNetwork } from './08-integrations-network'

// Chapter 2 of docs/SNOWFLAKE-COURSE-PLAN.md.
export const access: Course = {
  id: 'access',
  title: 'Objects, Identities, and Access',
  sections: [
    objectHierarchy,
    nameResolution,
    usersAuthentication,
    rolesInheritance,
    privilegesOwnership,
    databaseRoles,
    managedAccess,
    integrationsNetwork,
  ],
}
