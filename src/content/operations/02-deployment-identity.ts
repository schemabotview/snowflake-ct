import type { Section } from '../types'

export const deploymentIdentity: Section = {
  id: 'deployment-identity',
  title: 'Deployment identities, dependency order and privileges',
  scene: 'deploy-order',
  focus: 'order',
  slide: `## Who deploys, and in what order

A release must run as a **dedicated identity**, in **dependency order**, with its **grants** declared alongside the objects.

### The deployment identity
- \`DEPLOY_SVC\` is a **SERVICE** user — key pair, no password (chapter 2)
- Its role inherits \`RETAIL_ADMIN\`, so new objects are owned by a **role**, never a person
- CI runs the plan, someone **reviews the diff**, then CI deploys

### Dependency order
- Roles and grants → tables → views → pipelines → shares
- A view deployed before its table **fails**; a share deployed before its view **exposes nothing**

### Privilege changes are changes
- Grants live **in the release**, reviewed like any other code
- A grant made **by hand** in prod is **drift**`,
  narration:
    "Who actually runs a release matters as much as what it contains. If a release runs as whichever engineer happens to be on duty, objects end up owned by that person, grants get made by hand and forgotten, and nobody can say afterwards exactly what changed. So releases run as a dedicated identity: a deploy service user, of type service, authenticating with a key pair, exactly as chapter two recommended for workloads. Its role inherits retail admin, so everything it creates is owned by the same role that owns the rest of the retail database, not by a person. The pipeline runs a plan first, a human reviews the difference it will make, and only then does it deploy. Order matters too. Release one point four adds a refunds table and the new revenue view from chapter nine. Roles and grants must exist first, then tables, then the views that read them, then the pipelines that refresh them, and finally the shares that expose them to partners. Deploy a view before its table and it fails. Deploy a share before its view and the partner sees nothing. Declarative tools work out much of this ordering, but you still need to understand it to read a failure. And privilege changes are changes like any other. Grants belong in the release, reviewed in the same diff. A grant someone adds by hand in production is drift: the next declarative release either reverts it without warning or never knows it exists.",
}
