import { ICreateCampaignRepository } from '@/data/protocols'
import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICreateCampaign } from '@/domain/usecases'
import { v4 } from 'uuid'
import { Campaign } from '../../entities'
import { Database } from '../../helpers/Database'

export class CreateCampaignPostgresRepository implements ICreateCampaignRepository {
  async create(campaignData: ICreateCampaign.Params, schemaName: string): Promise<ICampaignModel> {
    let finalData: ICampaignModel = { uuid: v4(), ...campaignData }
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    const result: ICampaignModel = await campaignRepository.save(finalData)
    return new Promise((resolve) => resolve(result))
  }
}
