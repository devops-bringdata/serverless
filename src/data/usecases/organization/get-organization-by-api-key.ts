import { IOrganization } from '@/domain/models/organization'
import { IGetOrganizationByApiKey } from '@/domain/usecases/organization/get-organization-by-api-key'

export class GetOrganizationByApiKey implements IGetOrganizationByApiKey {
  constructor(private getOrganizationByApiKeyRepository: IGetOrganizationByApiKey) {}
  async get(apiKey: string): Promise<IOrganization> {
    const organization = await this.getOrganizationByApiKeyRepository.get(apiKey)
    return organization
  }
}
