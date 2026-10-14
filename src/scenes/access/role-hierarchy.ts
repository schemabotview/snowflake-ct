import type { Scene } from '@graphlearning/flow'

// §4 — read top to bottom: each role inherits everything granted to the roles below it. The
// custom tree hangs off SYSADMIN; users receive working roles at the bottom.
export const roleHierarchy: Scene = {
  id: 'role-hierarchy',
  title: 'Roles inherit what is granted to them',
  flow: 'TB',
  padding: 0.17,
  nodes: [
    {
      id: 'system-roles',
      label: 'System-defined roles',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'accountadmin', label: 'ACCOUNTADMIN', sub: 'top; a few people only', pattern: 'warn', icon: 'key' },
        { id: 'securityadmin', label: 'SECURITYADMIN', sub: 'MANAGE GRANTS', pattern: 'network', icon: 'shieldcheck' },
        { id: 'sysadmin', label: 'SYSADMIN', sub: 'databases, warehouses', pattern: 'network', icon: 'gears' },
      ],
    },
    { id: 'retail-admin', label: 'RETAIL_ADMIN', sub: 'owns database RETAIL', pattern: 'service', icon: 'database' },
    {
      id: 'custom-roles',
      label: 'Working roles — least privilege',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'loader', label: 'LOADER', sub: 'writes RAW', pattern: 'service', icon: 'package' },
        { id: 'analyst', label: 'ANALYST', sub: 'reads SALES', pattern: 'service', icon: 'search' },
      ],
    },
    {
      id: 'role-users',
      label: 'Users',
      pattern: 'user',
      cols: 2,
      children: [
        { id: 'ru-loader', label: 'LOADER_SVC', sub: 'has LOADER', pattern: 'user', icon: 'gears' },
        { id: 'ru-ana', label: 'ANA', sub: 'has ANALYST', pattern: 'user', icon: 'users' },
      ],
    },
    {
      id: 'grants-code',
      kind: 'code',
      filename: 'roles.sql',
      label: `GRANT ROLE analyst      TO ROLE retail_admin;  -- admin inherits analyst
GRANT ROLE loader       TO ROLE retail_admin;
GRANT ROLE retail_admin TO ROLE sysadmin;      -- keep the tree connected
GRANT ROLE analyst      TO USER ana;

USE ROLE analyst;          -- primary: owns what this session creates
USE SECONDARY ROLES ALL;   -- secondary: adds the user's other roles`,
    },
  ],
  edges: [
    { source: 'system-roles', target: 'retail-admin', label: 'SYSADMIN inherits' },
    { source: 'retail-admin', target: 'custom-roles', label: 'inherits both' },
    { source: 'custom-roles', target: 'role-users', label: 'granted to' },
    { source: 'role-users', target: 'grants-code', label: 'built by' },
  ],
}
