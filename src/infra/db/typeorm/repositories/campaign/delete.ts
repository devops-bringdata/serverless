import { IDeleteCampaign } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import { IHttpResponse } from '@/presentation/protocols'
import { Campaign } from '../../entities'
import { Database } from '../../helpers/Database'

export class DeleteCampaignRepository implements IDeleteCampaign {
  async delete(campaignId: string, schemaName: string): Promise<IHttpResponse> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const campaignRepository = connection.manager.getRepository(Campaign)
    await campaignRepository.update(campaignId, { deletedAt: new Date() })
    return ok({ body: 'Campaign sucessfully removed' })
  }
}
