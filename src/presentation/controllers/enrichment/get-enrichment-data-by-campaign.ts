import { ITenant } from '@/domain/models/tenant'
import { IFindUploadedDataByGroupId } from '@/domain/usecases'
import { IFindUploadedBase } from '@/domain/usecases/uploaded-bases/find-uploaded-base'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class GetEnrichmentDataByCreateCampaignController implements IController {
  constructor(
    private dbFindUploadedDataByGroupId: IFindUploadedDataByGroupId,
    private findUploadedBaseRepository: IFindUploadedBase
  ) {}
  async handle(request: GetEnrichmentDataByCreateCampaignController.Params, tenant: ITenant): Promise<IHttpResponse> {
    if (!request.groupId) return badRequest(new MissingParamError('groupId'))
    const rows = await this.dbFindUploadedDataByGroupId.findRows(request.groupId, tenant.schemaName)
    const uploadedBase = await this.findUploadedBaseRepository.find(tenant.schemaName, request.groupId)
    const result = {
      columns: [],
      info: { fileName: null, collectedDataQuantity: null }
    }
    result.info.fileName = uploadedBase?.fileName
    result.info.collectedDataQuantity = uploadedBase?.collectedDataQuantity
    rows.map((row) => {
      row.row_content.map((content) => {
        if (row.row_enrichment.length > 0) {
          const founded = row.row_enrichment.find((x) => x.header === content.header)
          if (founded) {
            if (content.value !== founded.result) {
              content.value = founded.result
              content.enriched = true
              content.variableType = founded.variableType
            }
          }
        }
      })
      result.columns.push({ columns: row.row_content, index: row.row_number })
    })
    return ok(result)
  }
}

export namespace GetEnrichmentDataByCreateCampaignController {
  export type Params = {
    groupId: string
  }
}
