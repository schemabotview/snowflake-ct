import type { Section } from '../types'

export const accountsRegionsEditions: Section = {
  id: 'accounts-regions-editions',
  title: 'Organisations, accounts, Regions and editions',
  scene: 'org-accounts',
  focus: 'org',
  slide: `## Where an account lives

An **organisation** groups a company's Snowflake **accounts**. Each account is created on one **cloud platform**, in one **Snowflake Region**, with one **edition**.

### Why each choice matters
- **Cloud and Region** decide where data is stored and processed — and what crossing a Region costs
- **Edition** decides which features exist: Standard, Enterprise, Business Critical, Virtual Private Snowflake
- Multi-cluster warehouses and failover, for example, need **Enterprise or higher**

### How you name an account
- Preferred identifier: \`orgname-account_name\`
- An account name alone is unique only **inside** its organisation
- Always state cloud, Region and edition before trusting an example`,
  narration:
    "Every query we run happens inside an account, so it's worth knowing where an account lives. A company's accounts sit together under an organisation. Each account is created on one cloud platform, such as AWS, Azure or Google Cloud, and in one Snowflake Region within that cloud. That choice decides where your data is physically stored and processed, which matters for regulation, for latency, and for cost, because moving data between Regions or clouds is billed. Each account also has an edition. Standard is the entry point, Enterprise adds features such as multi-cluster warehouses and longer Time Travel, Business Critical adds stronger security and compliance options along with failover, and Virtual Private Snowflake runs in its own isolated environment. In our retailer's organisation, production runs on Enterprise in a US Region, a European account on Azure runs Business Critical, and a development account stays on Standard. Clients find an account by its identifier: the organisation name, a hyphen, and the account name, because an account name on its own is only unique inside its organisation. The habit to build now is simple. When you read any example, including the ones in this course, check which cloud, Region and edition it assumes.",
}
