import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IGetCampaign } from '@/domain/usecases'
import { Campaign } from '../../entities'
import { Database } from '../../helpers/Database'

export class GetCampaignRepository implements IGetCampaign {
  async get(campaignId: string, schemaName: string): Promise<ICampaignModel> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    const campaign = await campaignRepository.findOne(campaignId)
    return campaign
  }
}
