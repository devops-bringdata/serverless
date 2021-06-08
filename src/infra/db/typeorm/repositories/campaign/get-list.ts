import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IGetCampaignList } from '@/domain/usecases'
import { Campaign } from '../../entities'
import { Database } from '../../helpers/Database'

export class GetCampaignListRepository implements IGetCampaignList {
  async getCampaignList(schemaName: string): Promise<ICampaignModel[]> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    const result = await campaignRepository.find({ order: { createdAt: 'DESC' } })
    return result
  }
}
