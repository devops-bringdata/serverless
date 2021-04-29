import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'bringdata-serverless',
  frameworkVersion: '2',
  org: 'bringdata',
  app: 'bringdata-serverless',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: {
        forceInclude: ['pg', 'aws-sdk']
      }
    },
    'serverless-offline': {
      httpPort: 3006
    },
    vpcId: {
      staging: 'vpc-03a2ecbe2d8d6f8f0',
      production: 'vpc-041c1f841163ba45e'
    },
    customEnv: {
      DB_HOST: {
        development: 'localhost',
        staging: '${ssm:/staging/database/db_host~true}',
        production: '${ssm:/production/database/db_host~true}'
      },
      DB_NAME: {
        development: 'core',
        staging: '${ssm:/staging/database/db_name~true}',
        production: '${ssm:/production/database/db_name~true}'
      },
      DB_PASSWORD: {
        development: '123456',
        staging: '${ssm:/staging/database/db_password~true}',
        production: '${ssm:/production/database/db_password~true}'
      },
      DB_PORT: {
        development: '5432',
        staging: '${ssm:/staging/database/db_port~true}',
        production: '${ssm:/production/database/db_port~true}'
      },
      DB_USERNAME: {
        development: 'postgres',
        staging: '${ssm:/staging/database/db_username~true}',
        production: '${ssm:/production/database/db_username~true}'
      },
      JWT_AUTH_SECRET: {
        development: '4aa04f57a84d4d1655b7ba575d7f7794',
        staging: '${ssm:/staging/external/jwt_auth_secret~true}',
        production: '${ssm:/production/external/jwt_auth_secret~true}'
      },
      SUBNET_1: {
        staging: 'subnet-04019329298c75baf',
        production: 'subnet-0c0e0bea929fe16d3'
      },
      SUBNET_2: {
        staging: 'subnet-0f4da0a963853b8df',
        production: 'subnet-071d88f0907454f2a'
      },
      SUBNET_3: {
        staging: 'subnet-004712f5be4ccd57f',
        production: 'subnet-052ca465572fe5620'
      }
    }
  },
  resources: {
    Resources: {
      LambdaSecurityGroup: {
        Type: 'AWS::EC2::SecurityGroup',
        Properties: {
          GroupDescription: 'EnrichmentLambda',
          VpcId: '${self:custom.vpcId.${opt:stage}}'
        }
      }
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    timeout: 15,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    vpc: {
      securityGroupIds: [{ Ref: 'LambdaSecurityGroup' }],
      subnetIds: [
        '${self:custom.customEnv.SUBNET_1.${opt:stage}}',
        '${self:custom.customEnv.SUBNET_2.${opt:stage}}',
        '${self:custom.customEnv.SUBNET_3.${opt:stage}}'
      ]
    },
    region: 'sa-east-1',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_HOST: '${self:custom.customEnv.DB_HOST.${opt:stage}}',
      DB_NAME: '${self:custom.customEnv.DB_NAME.${opt:stage}}',
      DB_PASSWORD: '${self:custom.customEnv.DB_PASSWORD.${opt:stage}}',
      DB_PORT: '${self:custom.customEnv.DB_PORT.${opt:stage}}',
      DB_USERNAME: '${self:custom.customEnv.DB_USERNAME.${opt:stage}}',
      TEST_DATABASE: 'bringdata-jest',
      JWT_AUTH_SECRET: '${self:custom.customEnv.JWT_AUTH_SECRET.${opt:stage}}',
      SENDGRID_API_KEY: '${ssm:/staging/external/sendgrid_api_key~true}'
    }
    // iamRoleStatements: [
    //   {
    //     Effect: "Allow",
    //     Action: ["ssm:GetParameter"],
    //     Resource: ["Fn::Join", ":", [[]]]
    //   },
    //   {
    //     Effect: "Allow",
    //     Action: ["kms:Decrypt"],
    //     Resource: [
    //       "arn:aws:kms:sa-east-1:886760609264:key/951107a1-733a-45de-ba30-64ee686e43c7"
    //     ]
    //   }
    // ]
  },

  functions: {
    enrichment: {
      handler: 'src/main/routes/campaign-routes.handle',
      events: [
        {
          http: {
            method: 'any',
            path: 'campaign'
          }
        }
      ]
    },
    getRowToEnrich: {
      handler: 'src/main/routes/rows-routes.handle',
      events: [
        {
          http: {
            method: 'any',
            path: 'enrichment-row'
          }
        }
      ]
    },
    getEnrichmentRows: {
      handler: 'src/main/routes/enrichment-routes.handle',
      events: [
        {
          http: {
            method: 'any',
            path: 'enrichment-rows'
          }
        }
      ]
    },
    uploadedBases: {
      handler: 'src/main/routes/uploaded-bases-routes.handle',
      events: [
        {
          http: {
            method: 'any',
            path: 'enrichment-uploaded-bases'
          }
        }
      ]
    },
    downloadEnrichedBase: {
      handler: 'src/main/routes/download-enriched-base.handle',
      events: [
        {
          http: {
            method: 'any',
            path: 'download-enriched-base'
          }
        }
      ]
    },
    chargeCredits: {
      handler: 'src/main/routes/charge-credits.handle',
      events: [
        {
          http: {
            method: 'any',
            path: 'charge-credits'
          }
        }
      ]
    },
    finishGroupValidation: {
      handler: 'src/main/routes/validation-routes.handle',
      events: [
        {
          http: {
            method: 'any',
            path: 'finish-group-validation'
          }
        }
      ]
    },
    validateSingleEmail: {
      handler: 'src/main/routes/validate-single-email.handle',
      events: [
        {
          http: {
            method: 'any',
            path: 'validate-single-email'
          }
        }
      ]
    }
  }
}
module.exports = serverlessConfiguration
