import { IDecrypter } from '@/data/protocols'
import { ITenant } from '@/domain/models/tenant'
import { IGetTenantByToken } from '@/domain/usecases'

export class GetTenantByToken implements IGetTenantByToken {
  constructor(private readonly decrypter: IDecrypter) {}
  async getTenant(accessToken: string): Promise<ITenant> {
    const tenant = await this.decrypter.decrypt(accessToken)
    if (tenant) {
      return { schemaName: tenant.schemaName, uuid: tenant.id }
    }

    return null
  }
}
