import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IGetCampaign } from '@/domain/usecases'
import { Campaign } from '../../entities'
import { connect } from '../../helpers/connection'

export class GetCampaignRepository implements IGetCampaign {
  async get(campaignId: string, schemaName: string): Promise<ICampaignModel> {
    const connection = await connect(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    const campaign = await campaignRepository.findOne(campaignId)
    return campaign
  }
}
