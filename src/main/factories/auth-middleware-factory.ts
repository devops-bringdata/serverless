import { GetTenantByApiKey, GetTenantByToken } from '@/data/usecases'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { GetApiKeyRepository } from '@/infra/db/typeorm/repositories/api-key'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleare'
import { IMiddleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (): IMiddleware => {
  const decrypter = new JwtAdapter(process.env.JWT_AUTH_SECRET)
  const getTenantByToken = new GetTenantByToken(decrypter)
  const getApiKey = new GetApiKeyRepository()
  const getTenantByApiKey = new GetTenantByApiKey(getApiKey)
  return new AuthMiddleware(getTenantByToken, getTenantByApiKey)
}
