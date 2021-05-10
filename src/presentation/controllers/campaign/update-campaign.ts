import { ICampaignVariablesModel } from '@/domain/models/campaign/campaignVariables'
import IEmailTemplateModel from '@/domain/models/campaign/emailTemplate'
import { ITenant } from '@/domain/models/tenant'
import { IUpdateCampaign } from '@/domain/usecases/campaign/update-campaign'
import { ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class UpdateCampaignController implements IController {
  constructor(private updateCampaignRepository: IUpdateCampaign) {}
  async handle(request: UpdateCampaignController.Params, tenant?: ITenant): Promise<IHttpResponse> {
    const response = await this.updateCampaignRepository.update(request, tenant.schemaName)
    return ok(response)
  }
}
export namespace UpdateCampaignController {
  export type Params = {
    uuid: string
    variables: Array<ICampaignVariablesModel>
    emailVariable: string
    name: string
    emailTemplate: IEmailTemplateModel
    collectWays: Array<string>
    groupId?: string
    mustEnrich?: boolean
    owner: string
  }
}
