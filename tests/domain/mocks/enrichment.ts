import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IRowEnrichment } from '@/domain/models/uploaded-data/row-enrichment'
import { lorem, random } from 'faker'

export const mockEnrichmentRow = (): IRowEnrichment => {
  return {
    campaign: random.uuid(),
    header: random.word(),
    history: random.boolean(),
    question: lorem.sentence(4),
    result: lorem.word(),
    variableType: random.number(1),
    lgpdJustification: lorem.sentence(4)
  }
}

export const mockUploadedBase = (): IUploadedBaseModel => {
  return {
    campaign: random.uuid(),
    fileName: random.word(),
    group: new Date().getTime().toString(),
    mustEnrich: random.boolean(),
    uuid: random.uuid(),
    validated: random.boolean(),
    collectedDataQuantity: random.number()
  }
}
