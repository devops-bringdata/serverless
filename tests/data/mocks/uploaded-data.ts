import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IFindUploadedDataByGroupId, IUpdateUploadedData } from '@/domain/usecases'
import { mockUploadedDataModel } from '../../domain/mocks/uploaded-data'
import { datatype, internet, lorem, name, phone, random } from 'faker'

export const makeUploadedDataRow = (): IUploadedDataModel => {
  return {
    row_content: [
      {
        header: name.title(),
        index: datatype.number(),
        value: random.word(),
        variableType: datatype.number(1),
        enriched: datatype.boolean()
      }
    ],
    row_enrichment: [
      {
        campaign: datatype.uuid(),
        fieldType: name.title(),
        header: random.word(),
        history: datatype.boolean(),
        variableType: 1,
        result: lorem.sentence(),
        lgpdJustification: lorem.sentence(),
        question: lorem.sentence(),
        inputConfigurations: {}
      }
    ],
    row_number: datatype.number(),
    row_validation: {
      emailValidation: {
        email: internet.email(),
        health: datatype.number(100),
        hints: [],
        isValid: datatype.boolean(),
        needsExternalValidation: datatype.boolean(),
        validationMessage: lorem.sentence()
      },
      phoneValidation: {
        phone: phone.phoneNumber(),
        health: datatype.number(100),
        hints: [],
        isValid: datatype.boolean(),
        needsExternalValidation: datatype.boolean(),
        validationMessage: lorem.sentence()
      }
    },
    uploadedDataGroup: datatype.datetime().getTime().toString(),
    uuid: datatype.uuid()
  }
}

export class UpdateUploadedDataSpy implements IUpdateUploadedData {
  rowId: string
  uploadedDataRow: IUploadedDataModel
  schemaName: string
  result: IUploadedDataModel = mockUploadedDataModel()
  async update(rowId: string, uploadedDataRow: IUploadedDataModel, schemaName: string): Promise<IUploadedDataModel> {
    this.rowId = rowId
    this.uploadedDataRow = uploadedDataRow
    this.schemaName = schemaName
    return this.result
  }
}

export class FindUploadedDataByGroupIdSpy implements IFindUploadedDataByGroupId {
  groupId: string
  schemaName: string
  result: Array<IUploadedDataModel> = [mockUploadedDataModel()]
  async findRows(groupId: string, schemaName: string): Promise<IUploadedDataModel[]> {
    this.groupId = groupId
    this.schemaName = schemaName
    return this.result
  }
}
