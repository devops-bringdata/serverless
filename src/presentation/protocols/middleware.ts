import { ITenant } from '@/domain/models/tenant'
import { IHttpRequest, IHttpResponse } from './http'

export interface IMiddleware {
  handle(httpRequest: IHttpRequest, tenant?: ITenant): Promise<IHttpResponse>
}
