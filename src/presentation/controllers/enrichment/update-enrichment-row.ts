import { IDecrypter } from '@/data/protocols'
import { IRowEnrichment } from '@/domain/models/uploaded-data/row-enrichment'
import { IUpdateUploadedData, IGetEnrichmentRow, IChargeCredits } from '@/domain/usecases'
import { IFindUploadedBase } from '@/domain/usecases/uploaded-bases/find-uploaded-base'
import { IUpdateUploadedBase } from '@/domain/usecases/uploaded-bases/update-uploaded-base'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class UpdateEnrichmentRowController implements IController {
  constructor(
    private updateUploadedData: IUpdateUploadedData,
    private decrypter: IDecrypter,
    private getEnrichmentRowRepository: IGetEnrichmentRow,
    private chargeCreditsRepository: IChargeCredits,
    private findUploadedBaseRepository: IFindUploadedBase,
    private updateUploadedBaseRepository: IUpdateUploadedBase
  ) {}
  async handle(httpRequest: UpdateEnrichmentRowController.Params): Promise<IHttpResponse> {
    if (!httpRequest.row) return badRequest(new MissingParamError('row'))
    if (!httpRequest.token) return badRequest(new MissingParamError('token'))
    const payload = await this.decrypter.decrypt(httpRequest.token)
    const originalRow = await this.getEnrichmentRowRepository.get(payload.uuid, payload.schemaName)
    let chargeCount = 0
    httpRequest.row.map((column) => {
      const founded = originalRow.row_enrichment.find((x) => x.header === column.header)
      if (founded && founded.result !== column.result) chargeCount++
    })
    const content: any = { row_enrichment: httpRequest.row }
    const response = await this.updateUploadedData.update(payload.uuid, content, payload.schemaName)
    if (chargeCount > 0) {
      await this.chargeCreditsRepository.charge(
        {
          amount: chargeCount,
          description: 'enrichment'
        },
        payload.schemaName
      )
      let uploadedBase = await this.findUploadedBaseRepository.find(payload.schemaName, originalRow.uploadedDataGroup)
      const uploadedBaseId = uploadedBase.uuid
      const dataToUpdate = JSON.parse(JSON.stringify(uploadedBase))
      delete dataToUpdate.uuid
      if (!dataToUpdate.collectedDataQuantity) dataToUpdate.collectedDataQuantity = 0
      dataToUpdate.collectedDataQuantity = parseInt(dataToUpdate.collectedDataQuantity) + chargeCount
      await this.updateUploadedBaseRepository.update(payload.schemaName, uploadedBaseId, dataToUpdate)
    }

    return ok(response)
  }
}

export namespace UpdateEnrichmentRowController {
  export type Params = {
    row: Array<IRowEnrichment>
    token: string
  }
}
