import { ITenant } from '@/domain/models/tenant'
import { IDuplicateCampaign } from '@/domain/usecases/campaign/duplicate-campaign'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class DuplicateCampaignController implements IController {
  constructor(private duplicateCampaignRepository: IDuplicateCampaign) {}
  async handle(request: DuplicateCampaignController.Params, tenant?: ITenant): Promise<IHttpResponse> {
    if (!request.campaignId) return badRequest(new MissingParamError('campaignId'))
    const response = await this.duplicateCampaignRepository.duplicate(request.campaignId, tenant.schemaName)
    return ok(response)
  }
}
export namespace DuplicateCampaignController {
  export type Params = {
    campaignId: string
  }
}
