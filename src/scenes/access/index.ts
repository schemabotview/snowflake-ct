import type { Scene } from '@graphlearning/flow'
import { objectTree } from './object-tree'
import { nameResolution } from './name-resolution'
import { usersAuthentication } from './users-authentication'
import { roleHierarchy } from './role-hierarchy'
import { accessChain } from './access-chain'
import { databaseRoles } from './database-roles'
import { managedAccess } from './managed-access'
import { stageAccess } from './stage-access'

// Course 2 — Objects, Identities, and Access.
export const accessScenes: Scene[] = [
  objectTree,
  nameResolution,
  usersAuthentication,
  roleHierarchy,
  accessChain,
  databaseRoles,
  managedAccess,
  stageAccess,
]
