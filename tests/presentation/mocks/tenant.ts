import { ITenant } from '@/domain/models/tenant'
import { IGetTenantByToken } from '@/domain/usecases'
import { IGetTenantByApiKey } from '@/domain/usecases/get-tenant-by-api-key'
import { datatype, random } from 'faker'

export class GetTenantByTokenSpy implements IGetTenantByToken {
  accessToken: string
  result: ITenant = {
    schemaName: random.word(),
    uuid: datatype.uuid(),
    expirationDate: datatype.datetime()
  }
  async getTenant(accessToken: string): Promise<ITenant> {
    this.accessToken = accessToken
    return this.result
  }
}

export class GetTenantByApiKeySpy implements IGetTenantByApiKey {
  apiKey: string
  result: ITenant = {
    schemaName: random.word(),
    uuid: datatype.uuid(),
    expirationDate: datatype.datetime()
  }
  async getTenant(apiKey: string): Promise<ITenant> {
    this.apiKey = apiKey
    return this.result
  }
}
