import { ITenant } from '@/domain/models/tenant'

declare namespace Express {
  interface Request {
    tenant: ITenant
  }
}
