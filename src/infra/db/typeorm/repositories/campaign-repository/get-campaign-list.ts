import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IGetCampaignList } from '@/domain/usecases'
import { Campaign } from '../../entities'
import { Database } from '../../helpers/Database'

export class GetCampaignListRepository implements IGetCampaignList {
  async getCampaignList(schemaName: string): Promise<ICampaignModel[]> {
    const database = new Database()
    console.log('database', database)
    const connection = await database.getConnection(schemaName)
    console.log('connection')
    const campaignRepository = connection.manager.getRepository(Campaign)
    console.log('repository', campaignRepository)
    const result = await campaignRepository.find({ order: { createdAt: 'DESC' } })
    console.log(result)
    return result
  }
}
