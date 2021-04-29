import { InvalidParamError } from '@/presentation/errors'
import { IValidation } from './validation'
export class InvalidFieldValidation implements IValidation {
  constructor(private fieldName: string) {}
  validate(input: any): Error {
    if (!input[this.fieldName]) {
      const error = new InvalidParamError(this.fieldName)
      return error
    }
  }
}
