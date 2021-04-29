import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { internet, lorem, random, phone } from 'faker'
import { mockEnrichmentRow } from './enrichment'

export const mockUploadedDataModel = (): IUploadedDataModel => {
  return {
    uuid: random.uuid(),
    row_content: [
      {
        header: random.word(),
        index: random.number(),
        value: random.word(),
        enriched: random.boolean(),
        variableType: random.number(1)
      }
    ],
    row_enrichment: [mockEnrichmentRow()],
    row_number: random.number(),
    row_validation: {
      emailValidation: {
        email: internet.email(),
        health: random.number(100),
        hints: [],
        isValid: random.boolean(),
        needsExternalValidation: random.boolean(),
        validationMessage: lorem.sentence(5)
      },
      phoneValidation: {
        phone: phone.phoneNumber(),
        health: random.number(100),
        hints: [],
        isValid: random.boolean(),
        needsExternalValidation: random.boolean(),
        validationMessage: lorem.sentence(5)
      }
    },
    uploadedDataGroup: random.word()
  }
}
