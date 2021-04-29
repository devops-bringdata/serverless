import { v4 } from 'uuid'
import { ICreateCampaignRepository } from '@/data/protocols/db/campaign/create-campaign-repository'
import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICreateCampaign } from '@/domain/usecases/campaign/create-campaign'

import { Campaign } from '../../entities/campaign'
import { connect } from '../../helpers/connection'

export class CreateCampaignPostgresRepository implements ICreateCampaignRepository {
  async create(campaignData: ICreateCampaign.Params, schemaName: string): Promise<ICampaignModel> {
    try {
      let finalData: ICampaignModel = { uuid: v4(), ...campaignData }
      const connection = await connect(schemaName)
      const campaignRepository = connection.manager.getRepository(Campaign)
      const result: ICampaignModel = await campaignRepository.save(finalData)
      return new Promise((resolve) => resolve(result))
    } catch (error) {
      console.log(error)
    }
  }
}
