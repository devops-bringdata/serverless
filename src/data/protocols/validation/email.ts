export interface IValidateEmail {
  validate(email: string, validateExternally: boolean, timeout: number): Promise<IValidateEmail.EmailValidationResponse>
}

export namespace IValidateEmail {
  export type EmailValidationResponse = {
    email: string
    hints: Array<string>
    health: number
    isValid: boolean
    validationMessage: string
    needsExternalValidation: boolean
  }
}
