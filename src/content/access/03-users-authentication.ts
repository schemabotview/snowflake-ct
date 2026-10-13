import type { Section } from '../types'

export const usersAuthentication: Section = {
  id: 'users-authentication',
  title: 'Users, authentication and service identities',
  scene: 'users-authentication',
  focus: 'service',
  slide: `## One identity per person, one per workload

A **user** is who connects. Before a session exists, the connection passes a **network policy**, then **authentication**.

### Two kinds of user
- \`TYPE = PERSON\` — people: SSO, or a password **with MFA**
- \`TYPE = SERVICE\` — workloads: **no password, no MFA**; key pair, workload identity federation or a programmatic access token
- \`LEGACY_SERVICE\` allowed passwords and is being **migrated to SERVICE**

### Why it matters
- A job never borrows a person's login — it gets its **own** user
- Defaults set the starting role and warehouse, not the permissions
- Check your account's current authentication requirements before copying a setup`,
  narration:
    "Every connection to Snowflake is made as a user, and a user is an identity, not a permission. Before that connection becomes a session, two checks happen. First a network policy, if one is set, decides whether the connection may come from where it is coming from. Then the user authenticates. Snowflake now draws a sharp line between two kinds of user. A person, such as our analyst Ana, is a user of type person. She signs in through single sign-on, or with a password plus multi-factor authentication. A workload, such as our nightly load job, is a user of type service. A service user cannot use a password at all, and cannot enrol in multi-factor authentication. Instead it proves who it is with a key pair, with workload identity federation, which lets a cloud workload use the identity its platform already gives it, or with a programmatic access token. An older type, legacy service, allowed passwords for automation; it is being retired and migrated to service. Two habits follow. A job never borrows a person's login; it gets its own user, so its access can be reviewed and revoked on its own. And a user's default role and warehouse only decide where a session starts. What it may do is decided by roles, which come next.",
}
