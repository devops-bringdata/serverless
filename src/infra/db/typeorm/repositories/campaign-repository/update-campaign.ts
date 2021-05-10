import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IUpdateCampaign } from '@/domain/usecases/campaign/update-campaign'
import { Campaign } from '../../entities'
import { connect } from '../../helpers/connection'

export class UpdateCampaignRepository implements IUpdateCampaign {
  async update(campaign: IUpdateCampaign.Params, schemaName: string): Promise<ICampaignModel> {
    const connection = await connect(schemaName)
    const uuid = campaign.uuid
    delete campaign.uuid
    const campaignRepository = connection.manager.getRepository(Campaign)
    const result = await campaignRepository.update(uuid, campaign).then((result) => result.raw[0])
    return result
  }
}
