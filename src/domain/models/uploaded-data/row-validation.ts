export default interface IRowValidation {
  emailValidation: IRowValidation.EmailValidation
  phoneValidation: IRowValidation.PhoneValidation
}

export namespace IRowValidation {
  export type EmailValidation = {
    email: string
    hints: Array<string>
    health: number
    isValid: boolean
    validationMessage: string
    needsExternalValidation: boolean
  }
  export type PhoneValidation = {
    phone: string
    hints: Array<string>
    health: number
    isValid: boolean
    validationMessage: string
    needsExternalValidation: boolean
  }
}
