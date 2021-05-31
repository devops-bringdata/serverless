import { ITenant } from '@/domain/models/tenant'
import { IGetTenantByApiKey } from '@/domain/usecases/get-tenant-by-api-key'
import { GetApiKeyRepository } from '@/infra/db/typeorm/repositories/api-key/get-api-key-repository'

export class GetTenantByApiKey implements IGetTenantByApiKey {
  constructor(private readonly getApiKeyRepository: GetApiKeyRepository) {}
  async getTenant(apiKey: string): Promise<ITenant> {
    const tenant = await this.getApiKeyRepository.get(apiKey)
    if (tenant) {
      return {
        schemaName: tenant.organization.schemaName,
        uuid: tenant.user.uuid,
        expirationDate: tenant.expirationDate
      }
    }

    return null
  }
}
