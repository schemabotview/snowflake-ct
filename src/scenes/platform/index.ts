import type { Scene } from '@graphlearning/flow'
import { workloadRequirements } from './workload-requirements'
import { threeLayers } from './three-layers'
import { orgAccounts } from './org-accounts'
import { sessionContext } from './session-context'
import { firstQuery } from './first-query'
import { costLedger } from './cost-ledger'

// Course 1 — Platform Foundations and a First Query.
export const platformScenes: Scene[] = [workloadRequirements, threeLayers, orgAccounts, sessionContext, firstQuery, costLedger]
