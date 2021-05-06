import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IGetCampaignList } from '@/domain/usecases'
import { Campaign } from '../../entities'
import { connect } from '../../helpers/connection'

export class GetCampaignListRepository implements IGetCampaignList {
  async getCampaignList(schemaName: string): Promise<ICampaignModel[]> {
    const connection = await connect(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    return await campaignRepository.find({ order: { createdAt: 'DESC' } })
  }
}
