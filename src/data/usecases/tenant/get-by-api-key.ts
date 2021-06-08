import { ITenant } from '@/domain/models/tenant'
import { IGetTenantByApiKey } from '@/domain/usecases'
import { GetApiKeyRepository } from '@/infra/db/typeorm/repositories/api-key'

export class GetTenantByApiKey implements IGetTenantByApiKey {
  constructor(private readonly getApiKeyRepository: GetApiKeyRepository) {}
  async getTenant(apiKey: string): Promise<ITenant> {
    const tenant = await this.getApiKeyRepository.get(apiKey)
    if (tenant) {
      return {
        schemaName: tenant.schemaName,
        uuid: tenant.userId,
        expirationDate: tenant.expirationDate
      }
    }

    return null
  }
}
