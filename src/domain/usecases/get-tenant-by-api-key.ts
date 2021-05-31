import { ITenant } from '../models/tenant'

export interface IGetTenantByApiKey {
  getTenant(apiKey: string): Promise<ITenant>
}
