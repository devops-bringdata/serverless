import { IGetTenantByApiKey } from '@/domain/usecases/get-tenant-by-api-key'
import { IGetTenantByToken } from '@/domain/usecases/get-tenant-by-token'
import { AccessDeniedError, ExpiredTokenError } from '../errors'
import { forbidden, ok, serverError, unauthorized } from '../helpers'
import { IHttpRequest, IHttpResponse } from '../protocols'
import { IMiddleware } from '../protocols/middleware'

export class AuthMiddleware implements IMiddleware {
  constructor(
    private readonly getTenantByToken: IGetTenantByToken,
    private readonly getTenantByApiKey: IGetTenantByApiKey
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['authorization']
      const apiKey = httpRequest.headers?.['apikey']

      if (apiKey) {
        const founded: any = await this.getTenantByApiKey.getTenant(apiKey)
        if (founded && (!founded.expirationDate || founded.expirationDate > new Date())) {
          return ok({ schemaName: founded.schemaName, uuid: founded.uuid })
        }
      }

      if (accessToken) {
        const tenant: any = await this.getTenantByToken.getTenant(accessToken)
        if (tenant) {
          return ok({ schemaName: tenant.schemaName, uuid: tenant.uuid })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      if (error.message === 'jwt expired') {
        return unauthorized(new ExpiredTokenError())
      }
      return serverError(error)
    }
  }
}
