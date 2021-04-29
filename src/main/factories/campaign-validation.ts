import { InvalidFieldValidation } from '@/presentation/helpers/validators/invalid-field-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { IValidation } from '@/presentation/helpers/validators/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'

export const makeCampaignValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['variables', 'emailVariable']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['variables']) {
    validations.push(new InvalidFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
