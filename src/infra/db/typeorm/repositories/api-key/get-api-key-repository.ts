import { IApiKey } from '@/domain/models/api-key'
import { IGetApiKey } from '@/domain/usecases/api-key/get-api-key'
import { ApiKey } from '../../entities'
import { Database } from '../../helpers/Database'

export class GetApiKeyRepository implements IGetApiKey {
  async get(apiKey: string): Promise<IApiKey> {
    const database = new Database()
    const connection = await database.getConnection('core')
    const apiKeyRepository = connection.manager.getRepository(ApiKey)
    const result: IApiKey = await apiKeyRepository
      .findOne({
        where: { key: apiKey }
      })
      .catch((error) => {
        console.log(error)
        return null
      })

    return result
  }
}
