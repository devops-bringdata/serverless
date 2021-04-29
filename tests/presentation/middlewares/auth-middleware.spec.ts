import { ITenant } from '../../../src/domain/models/tenant'
import { sign } from 'jsonwebtoken'
import { IGetTenantByToken } from '../../../src/domain/usecases/get-tenant-by-token'
import { AccessDeniedError, ExpiredTokenError } from '../../../src/presentation/errors'
import { forbidden, ok, serverError, unauthorized } from '../../../src/presentation/helpers'
import { IHttpRequest } from '../../../src/presentation/protocols'
import { AuthMiddleware } from '../../../src/presentation/middlewares/auth-middleare'

type SutTypes = {
  sut: AuthMiddleware
  getTenantByTokenStub: IGetTenantByToken
}
const makeSut = (): SutTypes => {
  class GetTenantByTokenStub implements IGetTenantByToken {
    async getTenant(_accessToken: string): Promise<ITenant> {
      return new Promise((resolve) => resolve({ schemaName: 'any_schemaName', uuid: 'any_id' }))
    }
  }
  const getTenantByTokenStub = new GetTenantByTokenStub()
  const sut = new AuthMiddleware(getTenantByTokenStub)
  return {
    sut,
    getTenantByTokenStub
  }
}
const mockAccessToken = sign({ schemaName: 'bringdatajest' }, 'any_secret')
const makeFakeRequest = (): IHttpRequest => ({
  headers: {
    authorization: mockAccessToken
  }
})
describe('Auth Middleware', () => {
  test('Should return 403 if no authorization exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call GetTenantByToken with correct accessToken', async () => {
    const { getTenantByTokenStub } = makeSut()
    const getTenantSpy = jest.spyOn(getTenantByTokenStub, 'getTenant')
    const sut = new AuthMiddleware(getTenantByTokenStub)
    await sut.handle(makeFakeRequest())
    expect(getTenantSpy).toHaveBeenCalledWith(mockAccessToken)
  })

  test('Should return 403 GetTenantByToken returns null', async () => {
    const { sut, getTenantByTokenStub } = makeSut()
    jest.spyOn(getTenantByTokenStub, 'getTenant').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if GetTenantByToken returns a tenent', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ schemaName: 'any_schemaName', uuid: 'any_id' }))
  })

  test('Should return 403 if GetTenantByToken throws with jwt expired', async () => {
    const { sut, getTenantByTokenStub } = makeSut()
    jest
      .spyOn(getTenantByTokenStub, 'getTenant')
      .mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error('jwt expired'))))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized(new ExpiredTokenError()))
  })

  test('Should return 500 if GetTenantByToken throws', async () => {
    const { sut, getTenantByTokenStub } = makeSut()
    jest
      .spyOn(getTenantByTokenStub, 'getTenant')
      .mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
