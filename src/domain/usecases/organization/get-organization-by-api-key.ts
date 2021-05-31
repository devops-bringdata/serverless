import { IOrganization } from '@/domain/models/organization'

export interface IGetOrganizationByApiKey {
  get(apiKey: string): Promise<IOrganization>
}
