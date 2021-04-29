import { IFindCampaignRepository } from '@/data/protocols/db/campaign/find-campaign-repository'
import { ICampaignModel } from '@/domain/models/campaign/campaign'

import { Campaign } from '../../entities/campaign'
import { connect, disconnect } from '../../helpers/connection'

export class FindCampaignPostgresRepository implements IFindCampaignRepository {
  async findById(campaignId: string, schemaName: string): Promise<ICampaignModel> {
    const campaignRepository = (await connect(schemaName)).manager.getRepository(Campaign)
    const result: ICampaignModel = await campaignRepository.findOne(campaignId)
    await disconnect()
    return result
  }
}
