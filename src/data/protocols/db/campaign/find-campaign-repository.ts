import { ICampaignModel } from '@/domain/models/campaign/campaign'

export interface IFindCampaignRepository {
  findById(campaignId: string, schemaName: string): Promise<ICampaignModel>
}
