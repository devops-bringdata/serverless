import { ITenant } from 'domain/models/tenant'

declare global {
  namespace Express {
    interface Request {
      tenant: ITenant
    }
  }
}
