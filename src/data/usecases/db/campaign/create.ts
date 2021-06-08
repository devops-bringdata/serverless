import { ICreateCampaignRepository } from '@/data/protocols'
import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICreateCampaign } from '@/domain/usecases'

export class DbCreateCampaign implements ICreateCampaign {
  constructor(private createCampaignRepository: ICreateCampaignRepository) {}

  async create(campaign: ICreateCampaign.Params, tenant: string): Promise<ICampaignModel> {
    const account = await this.createCampaignRepository.create(campaign, tenant)
    return account
  }
}
