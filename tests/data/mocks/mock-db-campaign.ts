import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IFindCampaign } from '@/domain/usecases'
import { mockCampaignModel } from '../../domain/mocks/campaign'

export class DbFindCampaignSpy implements IFindCampaign {
  campaignId: string
  schemaName: string
  result = mockCampaignModel()
  async findById(campaignId: string, schemaName: any): Promise<ICampaignModel> {
    this.campaignId = campaignId
    this.schemaName = schemaName
    return this.result
  }
}
