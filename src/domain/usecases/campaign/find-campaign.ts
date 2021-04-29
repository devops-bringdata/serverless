import { ICampaignModel } from '../../models/campaign/campaign'

export interface IFindCampaign {
  findById(campaignId: string, schemaName: string): Promise<ICampaignModel>
}
