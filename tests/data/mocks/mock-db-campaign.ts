import { IFindCampaignRepository } from '@/data/protocols/db/campaign/find-campaign-repository'
import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { mockCampaignModel } from '../../domain/mocks/campaign'

export class FindCampaignRepositorySpy implements IFindCampaignRepository {
  campaignId: string
  schemaName: string
  result = mockCampaignModel()
  async findById(campaignId: string, schemaName: any): Promise<ICampaignModel> {
    this.campaignId = campaignId
    this.schemaName = schemaName
    return this.result
  }
}
