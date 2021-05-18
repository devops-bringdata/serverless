import { ITenant } from '@/domain/models/tenant'
import { IStartEnrichment } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class StartEnrichmentController implements IController {
  constructor(private readonly startEnrichment: IStartEnrichment) {}
  async handle(request: StartEnrichmentController.Request, tenant?: ITenant): Promise<IHttpResponse> {
    if (!request.campaignId) return badRequest(new MissingParamError('campaignId'))
    if (!request.groupId) return badRequest(new MissingParamError('groupId'))
    const response = await this.startEnrichment.start(request.campaignId, request.groupId, tenant.schemaName)
    return ok(response)
  }
}

export namespace StartEnrichmentController {
  export type Request = {
    campaignId: string
    groupId: string
  }
}
