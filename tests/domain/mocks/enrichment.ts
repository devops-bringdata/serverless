import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IRowEnrichment } from '@/domain/models/uploaded-data/row-enrichment'
import { datatype, lorem, random } from 'faker'

export const mockEnrichmentRow = (): IRowEnrichment => {
  return {
    campaign: datatype.uuid(),
    header: random.word(),
    history: datatype.boolean(),
    question: lorem.sentence(4),
    result: lorem.word(),
    variableType: datatype.number(1),
    lgpdJustification: lorem.sentence(4),
    fieldType: random.word(),
    inputConfigurations: {}
  }
}

export const mockUploadedBase = (): IUploadedBaseModel => {
  return {
    campaign: datatype.uuid(),
    fileName: random.word(),
    group: new Date().getTime().toString(),
    mustEnrich: datatype.boolean(),
    uuid: datatype.uuid(),
    validated: datatype.boolean(),
    collectedDataQuantity: datatype.number()
  }
}
