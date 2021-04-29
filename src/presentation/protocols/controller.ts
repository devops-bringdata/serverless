import { ITenant } from '../../domain/models/tenant'
import { IHttpResponse } from './http'
export interface IController<T = any> {
  handle: (request: T, tenant?: ITenant) => Promise<IHttpResponse>
}
