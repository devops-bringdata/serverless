import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICreateCampaign } from '@/domain/usecases/campaign/create-campaign'
import { ICreateCampaignRepository } from '../../protocols/db/campaign/create-campaign-repository'

export class DbCreateCampaign implements ICreateCampaign {
  constructor(private createCampaignRepository: ICreateCampaignRepository) {}

  async create(campaign: ICreateCampaign.Params, tenant: string): Promise<ICampaignModel> {
    const account = await this.createCampaignRepository.create(campaign, tenant)
    return account
  }
}
