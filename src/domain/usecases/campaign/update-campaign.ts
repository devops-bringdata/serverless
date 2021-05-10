import { ICampaignVariablesModel } from '../../models/campaign/campaignVariables'
import IEmailTemplateModel from '../../models/campaign/emailTemplate'
import { ICampaignModel } from '../../models/campaign/campaign'

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
