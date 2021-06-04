import { InputConfigurations } from './input-configurations'
import { VariableTypeEnum } from './variable-type-enum'

export interface ICampaignVariablesModel {
  name: string
  question: string
  lgpdJustification?: string
  history: boolean
  variableType: VariableTypeEnum
  fieldType: string
  inputConfigurations: InputConfigurations
}
