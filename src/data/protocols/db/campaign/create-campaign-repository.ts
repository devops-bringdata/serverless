import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICreateCampaign } from '@/domain/usecases/campaign/create-campaign'

export interface ICreateCampaignRepository {
  create(campaign: ICreateCampaign.Params, tenant: string): Promise<ICampaignModel>
}
