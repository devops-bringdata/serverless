import { IFindCampaignRepository } from 'data/protocols/db/campaign/find-campaign-repository'
import { IFindCampaign } from 'domain/usecases/campaign/find-campaign'
import { ICampaignModel } from '@/domain/models/campaign/campaign'

export class DbFindCampaign implements IFindCampaign {
  constructor(private findCampaignRepository: IFindCampaignRepository) {}
  async findById(campaignId: string, schemaName: string): Promise<ICampaignModel> {
    const campaign = await this.findCampaignRepository.findById(campaignId, schemaName)
    return campaign
  }
}
