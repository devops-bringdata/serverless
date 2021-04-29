import { MissingParamError } from '@/presentation/errors'
import { IValidation } from '@/presentation/helpers/validators/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(_input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
type SutTypes = {
  sut: ValidationComposite
  validationStub: IValidation
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return { sut, validationStub }
}
describe('Validation Composite', () => {
  test('should return an error if anyy validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('shoud not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
