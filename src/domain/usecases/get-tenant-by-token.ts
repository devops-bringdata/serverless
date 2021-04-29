import { ITenant } from '../models/tenant'

export interface IGetTenantByToken {
  getTenant(accessToken: string): Promise<ITenant>
}
