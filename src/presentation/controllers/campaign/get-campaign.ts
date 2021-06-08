import { ITenant } from '@/domain/models/tenant'
import { IGetCampaign } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class GetCampaignController implements IController {
  constructor(private getCampaignRepository: IGetCampaign) {}
  async handle(request: GetCampaignController.Params, tenant?: ITenant): Promise<IHttpResponse> {
    if (!request.campaignId) return badRequest(new MissingParamError('campaignId'))
    const campaign = await this.getCampaignRepository.get(request.campaignId, tenant.schemaName)
    return ok(campaign)
  }
}

export namespace GetCampaignController {
  export type Params = {
    campaignId: string
  }
}
