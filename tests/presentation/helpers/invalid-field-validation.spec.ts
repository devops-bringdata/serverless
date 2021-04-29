import { InvalidParamError } from '../../../src/presentation/errors'
import { InvalidFieldValidation } from '../../../src/presentation/helpers/validators/invalid-field-validation'

describe('RequiredField Validation', () => {
  test('should return a InvalidParamError if validation fails', () => {
    const sut = new InvalidFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new InvalidParamError('field'))
  })
  test('should not return if validation succeeds', () => {
    const sut = new InvalidFieldValidation('field')
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
