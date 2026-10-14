import type { Section } from '../types'

export const integrationsNetwork: Section = {
  id: 'integrations-network',
  title: 'Integrations, cloud permissions and network boundaries',
  scene: 'stage-access',
  focus: 'sa-integration',
  slide: `## Leaving Snowflake needs a second permission system

To read \`s3://retailco-landing/orders/\`, the request crosses **Snowflake privileges**, the **storage integration**, and **AWS IAM**. Each can refuse.

### Who grants what
- Snowflake: \`LOADER\` needs USAGE on the **stage**; creating it needs USAGE on the **integration**
- Integration: holds the IAM role and the **allowed locations**
- AWS: the IAM role **trusts** Snowflake's IAM user plus an **external ID**
- Recreate the integration without a fixed external ID and the trust **breaks**

### Inbound boundaries
- A **network policy** limits where connections may come from
- Policies on a **user** override the account's policy
- A denied connection never reaches authentication`,
  narration:
    "The last access boundary sits at the edge of Snowflake, where data comes from, or goes to, your own cloud storage. Say the loader needs to read files from an S3 bucket. That request crosses three separate permission systems, and any one of them can refuse it. Inside Snowflake, the loader role needs usage on the landing stage. Whoever creates that stage also needs usage on a storage integration. The integration is an account-level object that holds the AWS role Snowflake should use and a list of allowed locations, so even a stage cannot point anywhere it likes. Then the request leaves Snowflake. On the AWS side, Snowflake acts as an IAM user, one for the whole account, which assumes the IAM role you created. That role's trust policy names Snowflake's user and an external ID, and you copy both from describe integration. Recreate the integration without fixing the external ID and the trust breaks. Network policies guard the inbound direction. They limit where connections may come from, a policy set on a user overrides the account's policy, and a refused connection never reaches authentication at all. Access, then, is layered: names, identities, roles, privileges, and cloud permissions. With those boundaries in place, we can turn to the data itself, and to how tables behave when they change.",
}
