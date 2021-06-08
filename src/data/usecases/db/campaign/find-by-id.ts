import { IFindCampaignRepository } from '@/data/protocols'
import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IFindCampaign } from '@/domain/usecases'

export class DbFindCampaign implements IFindCampaign {
  constructor(private findCampaignRepository: IFindCampaignRepository) {}
  async findById(campaignId: string, schemaName: string): Promise<ICampaignModel> {
    const campaign = await this.findCampaignRepository.findById(campaignId, schemaName)
    return campaign
  }
}
