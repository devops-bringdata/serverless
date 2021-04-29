import { IMiddleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleare'
import { GetTenantByToken } from '@/data/usecases/get-tenant-by-token/get-tenant-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'

export const makeAuthMiddleware = (): IMiddleware => {
  const decrypter = new JwtAdapter(process.env.JWT_AUTH_SECRET)
  const getTenantByToken = new GetTenantByToken(decrypter)
  return new AuthMiddleware(getTenantByToken)
}
