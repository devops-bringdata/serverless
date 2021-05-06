import { IValidation } from '@/presentation/helpers/validators/validation'
import { ITenant } from '@/domain/models/tenant'
import { ICreateCampaign } from '@/domain/usecases/campaign/create-campaign'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'
import { IStartEnrichment } from '@/domain/usecases/enrichment/start-enrichment'
import { ICampaignVariablesModel } from '@/domain/models/campaign/campaignVariables'
import IEmailTemplateModel from '@/domain/models/campaign/emailTemplate'

export class CreateCampaignController implements IController {
  constructor(
    private validation: IValidation,
    private createCampaign: ICreateCampaign,
    private startEnrichment: IStartEnrichment
  ) {}
  async handle(httpRequest: CreateCampaignController.Params, tenant: ITenant): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) return badRequest(error)
      let { variables, emailVariable, name, emailTemplate, collectWays, groupId, mustEnrich } = httpRequest
      if (!name) {
        name = `Nova Campanha ${new Date().toLocaleString('pt-BR')}`
      }
      if (!emailTemplate.buttonLabel) {
        emailTemplate.buttonLabel = 'ATUALIZAR MINHAS INFORMAÇÕES'
      }

      const campaign = await this.createCampaign.create(
        {
          variables,
          emailVariable,
          name,
          emailTemplate,
          owner: tenant.uuid,
          collectWays
        },
        tenant.schemaName
      )
      if (mustEnrich && groupId) {
        await this.startEnrichment.start(campaign.uuid, httpRequest.groupId, tenant.schemaName)
      }
      return ok(campaign)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateCampaignController {
  export type Params = {
    variables: Array<ICampaignVariablesModel>
    emailVariable: string
    name: string
    emailTemplate: IEmailTemplateModel
    collectWays: Array<string>
    groupId?: string
    mustEnrich?: boolean
  }
}
