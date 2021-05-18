import { IFindCampaignRepository } from '@/data/protocols/db/campaign/find-campaign-repository'
import { ICampaignModel } from '@/domain/models/campaign/campaign'

import { Campaign } from '../../entities/Campaign'
import { Database } from '../../helpers/Database'

export class FindCampaignPostgresRepository implements IFindCampaignRepository {
  async findById(campaignId: string, schemaName: string): Promise<ICampaignModel> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    const result: ICampaignModel = await campaignRepository.findOne(campaignId)
    return result
  }
}
