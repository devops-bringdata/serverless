import { MissingParamError } from '@/presentation/errors'
import { IValidation } from './validation'
export class RequiredFieldValidation implements IValidation {
  constructor(private fieldName: string) {}
  validate(input: any): Error {
    if (!input[this.fieldName]) {
      const error = new MissingParamError(this.fieldName)
      return error
    }
  }
}
