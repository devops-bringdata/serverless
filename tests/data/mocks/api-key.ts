import { IApiKey } from '@/domain/models/api-key'
import { IGetApiKey } from '@/domain/usecases'
import { datatype, name, random } from 'faker'

export class GetApiKeySpy implements IGetApiKey {
  apiKey: string
  result: IApiKey = {
    expirationDate: datatype.datetime(),
    key: random.alphaNumeric(),
    schemaName: name.title(),
    userId: datatype.uuid(),
    uuid: datatype.uuid()
  }
  async get(apiKey: string): Promise<IApiKey> {
    this.apiKey = apiKey
    return this.result
  }
}
