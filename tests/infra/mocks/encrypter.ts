import { IEncrypter } from '@/data/protocols/criptography/encrypter'
import { random } from 'faker'

export class EncrypterSpy implements IEncrypter {
  payload: any
  result = random.alphaNumeric(100)
  encrypt(payload: any): Promise<string> {
    this.payload = payload
    return new Promise((resolve) => {
      resolve(this.result)
    })
  }
}
