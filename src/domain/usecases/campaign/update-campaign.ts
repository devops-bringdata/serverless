import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICampaignVariablesModel } from '@/domain/models/campaign/campaignVariables'
import IEmailTemplateModel from '@/domain/models/campaign/emailTemplate'

export interface IUpdateCampaign {
  update: (campaign: IUpdateCampaign.Params, schemaName: string) => Promise<ICampaignModel>
}

export namespace IUpdateCampaign {
  export type Params = {
    uuid: string
    name: string
    owner: string
    emailVariable: string
    variables: Array<ICampaignVariablesModel>
    collectWays: Array<string>
    emailTemplate: IEmailTemplateModel
    resendDate?: Date
  }
}
