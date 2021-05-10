import { ICampaignModel } from '@/domain/models/campaign/campaign'

export interface IGetCampaign {
  get(campaignId: string, schemaName: string): Promise<ICampaignModel>
}
