import { ITenant } from '@/domain/models/tenant'
import { IGetUploadedBases } from '@/domain/usecases/uploaded-bases/get-uploaded-bases'
import { ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class GetEnrichmentUploadedBasesController implements IController {
  constructor(private getUploadedBases: IGetUploadedBases) {}
  async handle(_request: any, tenant?: ITenant): Promise<IHttpResponse> {
    const uploadedBases = await this.getUploadedBases.get(tenant.schemaName, true)
    return ok(uploadedBases)
  }
}
