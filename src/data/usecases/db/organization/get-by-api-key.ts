import { IOrganization } from '@/domain/models/organization'
import { IGetOrganizationByApiKey } from '@/domain/usecases'

export class GetOrganizationByApiKey implements IGetOrganizationByApiKey {
  constructor(private getOrganizationByApiKeyRepository: IGetOrganizationByApiKey) {}
  async get(apiKey: string): Promise<IOrganization> {
    const organization = await this.getOrganizationByApiKeyRepository.get(apiKey)
    return organization
  }
}
