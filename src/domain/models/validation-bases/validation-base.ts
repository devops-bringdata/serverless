import { ValidationResults } from './validation-results'

export interface IValidationBaseModel {
  uuid: string
  name: string
  storeName: string
  emails: ValidationResults
  phones: ValidationResults
  addresses: ValidationResults
  userId: string
  finished: boolean
}
