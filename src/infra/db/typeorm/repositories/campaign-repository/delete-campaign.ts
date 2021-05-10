import { IDeleteCampaign } from '@/domain/usecases/campaign/delete-campaign'
import { ok } from '@/presentation/helpers'
import { IHttpResponse } from '@/presentation/protocols'
import { Campaign } from '../../entities'
import { connect } from '../../helpers/connection'

export class DeleteCampaignRepository implements IDeleteCampaign {
  async delete(campaignId: string, schemaName: string): Promise<IHttpResponse> {
    const connection = await connect(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    await campaignRepository.update(campaignId, { deletedAt: new Date() })
    return ok({ body: 'Campaign sucessfully removed' })
  }
}
