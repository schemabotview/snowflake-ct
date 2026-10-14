import type { Scene } from '@graphlearning/flow'

// §3 — a connection passes the network policy, then authenticates as a user of one TYPE, then
// becomes a session with a role. Person and service users authenticate differently.
export const usersAuthentication: Scene = {
  id: 'users-authentication',
  title: 'From connection to session',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    { id: 'network-policy', label: 'Network policy', sub: 'allowed sources, checked first', pattern: 'warn', icon: 'shieldcheck' },
    {
      id: 'users',
      label: 'Then authenticate — one identity each',
      pattern: 'user',
      cols: 2,
      children: [
        {
          id: 'person',
          label: 'TYPE = PERSON',
          pattern: 'user',
          cols: 1,
          children: [
            { id: 'user-ana', label: 'ANA', sub: 'analyst, signs in', pattern: 'user', icon: 'users' },
            { id: 'auth-sso', label: 'SSO or password', sub: 'plus MFA', pattern: 'user', icon: 'shieldcheck' },
          ],
        },
        {
          id: 'service',
          label: 'TYPE = SERVICE',
          pattern: 'service',
          cols: 1,
          children: [
            { id: 'user-loader', label: 'LOADER_SVC', sub: 'nightly load job', pattern: 'service', icon: 'gears' },
            { id: 'auth-key', label: 'Key pair or WIF', sub: 'no password, no MFA', pattern: 'service', icon: 'key' },
          ],
        },
      ],
    },
    {
      id: 'create-service-user',
      kind: 'code',
      filename: 'loader_svc.sql',
      label: `CREATE USER loader_svc
  TYPE              = SERVICE   -- cannot use a password
  DEFAULT_ROLE      = loader
  DEFAULT_WAREHOUSE = load_wh
  RSA_PUBLIC_KEY    = 'MIIBIjANBgkqh...';  -- private key stays with the job`,
    },
  ],
  edges: [
    { source: 'network-policy', target: 'users', label: 'connection allowed' },
    { source: 'users', target: 'create-service-user', label: 'a service user, defined' },
  ],
}
