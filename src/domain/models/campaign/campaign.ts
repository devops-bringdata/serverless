import { ICampaignVariablesModel } from './campaignVariables'
import IEmailTemplateModel from './emailTemplate'

export interface ICampaignModel {
  uuid: string
  name?: string
  owner: string
  emailVariable: string
  variables: Array<ICampaignVariablesModel>
  collectWays: Array<string>
  emailTemplate: IEmailTemplateModel
  resendDate?: Date
}
