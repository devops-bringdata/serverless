import { IMiddleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleare'
import { GetTenantByToken } from '@/data/usecases/get-tenant/get-tenant-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { GetApiKeyRepository } from '@/infra/db/typeorm/repositories/api-key/get-api-key-repository'
import { GetTenantByApiKey } from '@/data/usecases/get-tenant/get-tenant-by-api-key'

export const makeAuthMiddleware = (): IMiddleware => {
  const decrypter = new JwtAdapter(process.env.JWT_AUTH_SECRET)
  const getTenantByToken = new GetTenantByToken(decrypter)
  const getApiKey = new GetApiKeyRepository()
  const getTenantByApiKey = new GetTenantByApiKey(getApiKey)
  return new AuthMiddleware(getTenantByToken, getTenantByApiKey)
}
