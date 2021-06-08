import { IOrganization } from '@/domain/models/organization'
import { IGetOrganizationByApiKey } from '@/domain/usecases'
import { datatype, name, random } from 'faker'

export class GetOrganizationByApiKeySpy implements IGetOrganizationByApiKey {
  apiKey: string
  result: IOrganization = {
    name: name.title(),
    plan: random.word(),
    schemaName: name.title(),
    uuid: datatype.uuid()
  }
  async get(apiKey: string): Promise<IOrganization> {
    this.apiKey = apiKey
    return this.result
  }
}
