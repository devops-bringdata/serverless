import { ITenant } from '@/domain/models/tenant'
import { IFindUploadedDataByGroupId } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'
import * as converter from 'json-2-csv'
export class DownloadEnrichedBaseController implements IController {
  constructor(private findUploadedDataByGroupIdRepository: IFindUploadedDataByGroupId) {}
  async handle(request: DownloadEnrichedBaseController.Request, tenant?: ITenant): Promise<IHttpResponse> {
    if (!request.groupId) return badRequest(new MissingParamError('groupId'))
    const rows = await this.findUploadedDataByGroupIdRepository.findRows(request.groupId, tenant.schemaName)
    if (rows.length === 0) return ok([])
    const result = rows
      .sort((a, b) => (a.row_number > b.row_number ? 1 : b.row_number > a.row_number ? -1 : 0))
      .map((row) => {
        row.row_content.map((content) => {
          if (row.row_enrichment.length > 0) {
            const founded = row.row_enrichment.find((x) => x.header === content.header && x.result !== null)
            if (founded) {
              content.value = founded.result
              content.enriched = true
            }
          }
          return content
        })
        const sortedColumns = row.row_content.sort((a, b) => (a.index > b.index ? 1 : b.index > a.index ? -1 : 0))
        const csvRow = {}
        sortedColumns.map((column) => {
          csvRow[column.header] = column.value
        })
        return csvRow
      })
    let csv: string = await new Promise((resolve, _reject) => {
      converter.json2csv(
        result,
        (_err, data) => {
          resolve(data)
        },
        { delimiter: { field: ';' } }
      )
    })
    return ok(csv)
  }
}

export namespace DownloadEnrichedBaseController {
  export type Request = {
    groupId: string
  }
}
