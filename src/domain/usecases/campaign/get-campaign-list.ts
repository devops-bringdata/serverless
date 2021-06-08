import { ICampaignModel } from '@/domain/models/campaign/campaign'

export interface IGetCampaignList {
  getCampaignList(schemaName: string): Promise<ICampaignModel[]>
}
