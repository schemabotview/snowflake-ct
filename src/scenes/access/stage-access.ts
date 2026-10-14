import type { Scene } from '@graphlearning/flow'

// §8 — reading s3://retailco-landing/orders/ crosses three permission systems: Snowflake grants,
// the integration's allowed locations, and AWS IAM trust. Any one of them can say no.
export const stageAccess: Scene = {
  id: 'stage-access',
  title: 'Three permission systems between a role and a bucket',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'snowflake-side',
      label: 'Snowflake privileges',
      pattern: 'service',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'sa-loader', label: 'LOADER', sub: 'USAGE on the stage', pattern: 'service', icon: 'package' },
        { id: 'sa-stage', label: 'Stage LANDING', sub: 'RETAIL.RAW', pattern: 'service', icon: 'folder' },
        { id: 'sa-integration', label: 'S3_RETAIL_INT', sub: 'allowed locations only', pattern: 'network', icon: 'plug' },
      ],
      edges: [
        { source: 'sa-loader', target: 'sa-stage' },
        { source: 'sa-stage', target: 'sa-integration' },
      ],
    },
    {
      id: 'aws-side',
      label: 'AWS IAM',
      pattern: 'external',
      flow: 'LR',
      cols: 3,
      children: [
        { id: 'aws-user', label: 'Snowflake IAM user', sub: 'one per account', pattern: 'external', icon: 'fingerprint' },
        { id: 'aws-role', label: 'IAM role', sub: 'trust: user + external ID', pattern: 'external', icon: 'lock' },
        { id: 'aws-bucket', label: 'S3 bucket', sub: 'retailco-landing', pattern: 'external', icon: 'harddrive' },
      ],
      edges: [
        { source: 'aws-user', target: 'aws-role', label: 'assumes' },
        { source: 'aws-role', target: 'aws-bucket', label: 'reads' },
      ],
    },
    {
      id: 'integration-code',
      kind: 'code',
      filename: 's3_retail_int.sql',
      label: `CREATE STORAGE INTEGRATION s3_retail_int
  TYPE = EXTERNAL_STAGE  STORAGE_PROVIDER = 'S3'  ENABLED = TRUE
  STORAGE_AWS_ROLE_ARN      = 'arn:aws:iam::123456789012:role/retail-landing'
  STORAGE_ALLOWED_LOCATIONS = ('s3://retailco-landing/orders/');

DESC INTEGRATION s3_retail_int;  -- STORAGE_AWS_IAM_USER_ARN, STORAGE_AWS_EXTERNAL_ID
                                 --   → paste both into the IAM role's trust policy
CREATE STAGE retail.raw.landing
  URL = 's3://retailco-landing/orders/'  STORAGE_INTEGRATION = s3_retail_int;`,
    },
  ],
  edges: [
    { source: 'snowflake-side', target: 'aws-side', label: 'integration identity crosses' },
    { source: 'aws-side', target: 'integration-code', label: 'configured by' },
  ],
}
