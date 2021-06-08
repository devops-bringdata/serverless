import { ITenant } from '@/domain/models/tenant'
import { IDeleteCampaign } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class DeleteCampaignController implements IController {
  constructor(private deleteCampaignRepository: IDeleteCampaign) {}
  async handle(request: DeleteCampaignController.Params, tenant?: ITenant): Promise<IHttpResponse> {
    if (!request.campaignId) return badRequest(new MissingParamError('campaignId'))
    return this.deleteCampaignRepository.delete(request.campaignId, tenant.schemaName)
  }
}

export namespace DeleteCampaignController {
  export type Params = {
    campaignId: string
  }
}
