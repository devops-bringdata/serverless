import { IDuplicateCampaign } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import { IHttpResponse } from '@/presentation/protocols'
import { v4 } from 'uuid'
import { Campaign } from '../../entities'
import { Database } from '../../helpers/Database'

export class DuplicateCampaignRepository implements IDuplicateCampaign {
  async duplicate(campaignId: string, schemaName: string): Promise<IHttpResponse> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    let campaign = await campaignRepository.findOne(campaignId)
    let copy = JSON.parse(JSON.stringify(campaign))
    copy.uuid = v4()
    copy.name = campaign.name + '(Copy)'
    const copiedCampaign = await campaignRepository.save(copy)
    return ok(copiedCampaign)
  }
}
