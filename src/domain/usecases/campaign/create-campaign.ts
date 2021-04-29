import { ICampaignVariablesModel } from '../../models/campaign/campaignVariables'
import { IEmailTemplateModel } from '../../models/campaign/emailTemplate'
import { ICampaignModel } from '../../models/campaign/campaign'

export interface ICreateCampaign {
  create: (campaign: ICreateCampaign.Params, tenant: string) => Promise<ICampaignModel>
}

export namespace ICreateCampaign {
  export type Params = {
    name?: string
    owner: string
    emailVariable: string
    variables: Array<ICampaignVariablesModel>
    collectWays: Array<string>
    emailTemplate: IEmailTemplateModel
    resendDate?: Date
  }
}
