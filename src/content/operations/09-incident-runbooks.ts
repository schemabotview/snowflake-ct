import type { Section } from '../types'

export const incidentRunbooks: Section = {
  id: 'incident-runbooks',
  title: 'Security and cost incidents, ownership and runbooks',
  scene: 'security-runbook',
  focus: 'security',
  slide: `## Contain first, then investigate

Incidents are handled from **runbooks written in advance**, with a named **owner** for every step.

### A leaked service key
- **Contain**: disable \`LOADER_SVC\`; **block** the unknown IP in the network policy
- **Rotate**: add the new key in the second key slot, then remove the old one
- **Scope**: login and access history — was **personal data** read?
- **Learn**: why could it connect from that address at all?

### A runaway warehouse
- **Contain**: cap the clusters; **find** the 10-second dashboard; fix it **with its owner**
- **Prevent**: the resource monitor and budget from chapter 8

### Runbooks work only if
- They are written **before**, owned by **name**, and **rehearsed**`,
  narration:
    "The last kind of incident is the one nobody wants: security and cost. Both are handled the same way, from runbooks written in advance, with a named owner for every step, and both start with containment before investigation. On the ninth of October, the loader service user is seen connecting from an IP address nobody recognises. Its private key has leaked. Step one is containment: disable the user, which stops new sessions immediately, and add the address to the network policy's blocked list. Step two is rotation. Snowflake users have two key slots, so the platform team adds a new public key in the second slot, moves the job to the new private key, and removes the old one, without the pipeline being down for longer than necessary. Step three is scope: login history and access history from chapter nine show exactly what that session read. If personal data was read, step four involves the data owner and legal. And the last step is learning: why could a service user connect from that address at all? A user-level network policy would have prevented it. A cost incident has the same shape. The BI warehouse has run three clusters all weekend. Cap it first, then find the cause, a dashboard refreshing every ten seconds, and fix it with its owner. Runbooks only work if written before, owned by name, and rehearsed.",
}
