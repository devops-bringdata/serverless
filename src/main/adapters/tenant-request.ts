import { ITenant } from '@/domain/models/tenant'
import { Request } from 'express'

export interface TenantRequest extends Request {
  tenant: ITenant
}
