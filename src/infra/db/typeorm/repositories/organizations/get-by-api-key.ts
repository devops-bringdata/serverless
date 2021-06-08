import { IOrganization } from '@/domain/models/organization'
import { IGetOrganizationByApiKey } from '@/domain/usecases'
import { Organization } from '../../entities'
import { Database } from '../../helpers/Database'

export class GetOrganizationByApiKeyRepository implements IGetOrganizationByApiKey {
  async get(apiKey: string): Promise<IOrganization> {
    const database = new Database()
    const connection = await database.getConnection('core')
    const organizationRepository = connection.manager.getRepository(Organization)
    const result: IOrganization = await organizationRepository.findOne({ where: { apiKey } })
    return result
  }
}
