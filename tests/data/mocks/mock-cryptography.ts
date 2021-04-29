import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { random } from 'faker'

export class DecrypterSpy implements IDecrypter {
  payload: { uuid: string; schemaName: string } = {
    uuid: random.uuid(),
    schemaName: random.word()
  }
  encryptedText: string

  async decrypt(value: string): Promise<any> {
    this.encryptedText = value
    return this.payload
  }
}
