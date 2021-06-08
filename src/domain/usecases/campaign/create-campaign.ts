import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICampaignVariablesModel } from '@/domain/models/campaign/campaignVariables'
import IEmailTemplateModel from '@/domain/models/campaign/emailTemplate'

export interface ICreateCampaign {
  create: (campaign: ICreateCampaign.Params, tenant: string) => Promise<ICampaignModel>
}

export namespace ICreateCampaign {
  export type Params = {
    name: string
    owner: string
    emailVariable: string
    variables: Array<ICampaignVariablesModel>
    collectWays: Array<string>
    emailTemplate: IEmailTemplateModel
    resendDate?: Date
  }
}
