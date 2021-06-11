import { IValidateEmail } from '@/data/protocols/validation/email'
import validate from 'deep-email-validator'
export class ValidateEmail implements IValidateEmail {
  async validate(email: string): Promise<IValidateEmail.EmailValidationResponse> {
    const parts = email.split('@')
    const domain = parts[1]
    let catchAll = await validate({
      email: `kjuhyysgdftyuabuetgdfasdfgh@${domain}`,
      validateRegex: true,
      validateMx: true,
      validateTypo: false,
      validateDisposable: true,
      validateSMTP: true
    }).then((result) => {
      if (result.valid) return true
      else return false
    })
    if (catchAll) {
      return {
        email,
        health: 75,
        hints: [],
        isValid: true,
        needsExternalValidation: false,
        validationMessage: 'deliverable'
      }
    } else {
      return await validate({
        email,
        validateRegex: true,
        validateMx: true,
        validateTypo: false,
        validateDisposable: true,
        validateSMTP: true
      }).then((result) => {
        console.log(result)
        if (result.valid) {
          return {
            email,
            health: 100,
            hints: [],
            isValid: true,
            needsExternalValidation: false,
            validationMessage: 'valid'
          }
        } else {
          return {
            email,
            health: 0,
            hints: [],
            isValid: false,
            needsExternalValidation: false,
            validationMessage: 'invalid'
          }
        }
      })
    }
  }
}
