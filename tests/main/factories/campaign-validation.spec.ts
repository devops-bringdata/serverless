import { IValidation } from '@/presentation/helpers/validators/validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { makeCampaignValidation } from '@/main/factories/campaign-validation'
import { InvalidFieldValidation } from '@/presentation/helpers/validators/invalid-field-validation'
jest.mock('@/presentation/helpers/validators/validation-composite')
describe('CampaignValidation', () => {
  test('should call ValidationComposite with all validations', () => {
    makeCampaignValidation()
    const validations: IValidation[] = []
    for (const field of ['variables', 'emailVariable']) {
      validations.push(new RequiredFieldValidation(field))
    }
    for (const field of ['variables']) {
      validations.push(new InvalidFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
