import { ICampaignModel } from '../../models/campaign/campaign'

export interface IGetCampaignList {
  getCampaignList(schemaName: string): Promise<ICampaignModel[]>
}
