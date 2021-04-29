import { ITenant } from '@/domain/models/tenant'
import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { IGetTenantByToken } from '@/domain/usecases/get-tenant-by-token'

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
