import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { datatype, random } from 'faker'

export class DecrypterSpy implements IDecrypter {
  payload: { uuid: string; schemaName: string } = {
    uuid: datatype.uuid(),
    schemaName: random.word()
  }
  encryptedText: string

  async decrypt(value: string): Promise<any> {
    this.encryptedText = value
    return this.payload
  }
}
