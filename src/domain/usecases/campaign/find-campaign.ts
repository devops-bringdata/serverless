import { ICampaignModel } from '@/domain/models/campaign/campaign'

export interface IFindCampaign {
  findById(campaignId: string, schemaName: string): Promise<ICampaignModel>
}
