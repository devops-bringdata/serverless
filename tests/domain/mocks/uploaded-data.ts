import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { internet, lorem, random, phone, datatype } from 'faker'
import { mockEnrichmentRow } from './enrichment'

export const mockUploadedDataModel = (): IUploadedDataModel => {
  return {
    uuid: datatype.uuid(),
    row_content: [
      {
        header: random.word(),
        index: datatype.number(),
        value: random.word(),
        enriched: datatype.boolean(),
        variableType: datatype.number(1)
      }
    ],
    row_enrichment: [mockEnrichmentRow()],
    row_number: datatype.number(),
    row_validation: {
      emailValidation: {
        email: internet.email(),
        health: datatype.number(100),
        hints: [],
        isValid: datatype.boolean(),
        needsExternalValidation: datatype.boolean(),
        validationMessage: lorem.sentence(5)
      },
      phoneValidation: {
        phone: phone.phoneNumber(),
        health: datatype.number(100),
        hints: [],
        isValid: datatype.boolean(),
        needsExternalValidation: datatype.boolean(),
        validationMessage: lorem.sentence(5)
      }
    },
    uploadedDataGroup: random.word()
  }
}
