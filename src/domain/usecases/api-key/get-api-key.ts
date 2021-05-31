import { IApiKey } from '@/domain/models/api-key'

export interface IGetApiKey {
  get(apiKey: string): Promise<IApiKey>
}
