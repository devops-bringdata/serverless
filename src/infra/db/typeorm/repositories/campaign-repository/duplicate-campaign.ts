import { IDuplicateCampaign } from '@/domain/usecases/campaign/duplicate-campaign'
import { ok } from '@/presentation/helpers'
import { IHttpResponse } from '@/presentation/protocols'
import { v4 } from 'uuid'
import { Campaign } from '../../entities'
import { connect } from '../../helpers/connection'

export class DuplicateCampaignRepository implements IDuplicateCampaign {
  async duplicate(campaignId: string, schemaName: string): Promise<IHttpResponse> {
    const connection = await connect(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    let campaign = await campaignRepository.findOne(campaignId)
    let copy = JSON.parse(JSON.stringify(campaign))
    copy.uuid = v4()
    copy.name = campaign.name + '(Copy)'
    const copiedCampaign = await campaignRepository.save(copy)
    return ok(copiedCampaign)
  }
}
