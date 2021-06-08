import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IGetUploadedBases } from '@/domain/usecases/uploaded-bases/get-uploaded-bases'
import { datatype, name } from 'faker'

export class GetUploadedBasesSpy implements IGetUploadedBases {
  schemaName: string
  enrichment: boolean
  result: IUploadedBaseModel = {
    campaign: datatype.uuid(),
    collectedDataQuantity: 1,
    fileName: name.title(),
    group: datatype.datetime().getTime().toString(),
    mustEnrich: datatype.boolean(),
    uuid: datatype.uuid(),
    validated: datatype.boolean()
  }
  async get(schemaName: string, enrichment?: boolean): Promise<IUploadedBaseModel[]> {
    this.schemaName = schemaName
    this.enrichment = enrichment
    return [this.result]
  }
}
