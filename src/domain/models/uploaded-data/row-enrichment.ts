import { VariableTypeEnum } from '../campaign/variable-type-enum'

export type IRowEnrichment = {
  campaign: string
  header: string
  question: string
  lgpdJustification?: string
  history: boolean
  variableType: VariableTypeEnum
  result: string
  fieldType: string
  inputConfigurations: object
}
