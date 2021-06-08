import { sign } from 'jsonwebtoken'
import { AccessDeniedError, ExpiredTokenError } from '../../../src/presentation/errors'
import { forbidden, serverError, unauthorized } from '../../../src/presentation/helpers'
import { IHttpRequest } from '../../../src/presentation/protocols'
import { AuthMiddleware } from '../../../src/presentation/middlewares/auth-middleare'
import { GetTenantByApiKeySpy, GetTenantByTokenSpy } from '../mocks/tenant'
import { random } from 'faker'

type SutTypes = {
  sut: AuthMiddleware
  getTenantByTokenSpy: GetTenantByTokenSpy
  getTenantByApiKeySpy: GetTenantByApiKeySpy
}
const makeSut = (): SutTypes => {
  const getTenantByTokenSpy = new GetTenantByTokenSpy()
  const getTenantByApiKeySpy = new GetTenantByApiKeySpy()
  const sut = new AuthMiddleware(getTenantByTokenSpy, getTenantByApiKeySpy)
  return {
    sut,
    getTenantByTokenSpy,
    getTenantByApiKeySpy
  }
}
const mockSchemaName = random.word()
const mockSecret = random.word()
const mockAccessToken = sign({ schemaName: mockSchemaName }, mockSecret)
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
    const { sut, getTenantByTokenSpy } = makeSut()
    // const getTenantSpy = jest.spyOn(getTenantByTokenStub, 'getTenant')
    await sut.handle(makeFakeRequest())
    expect(getTenantByTokenSpy.accessToken).toBe(mockAccessToken)
  })

  test('Should return 403 GetTenantByToken returns null', async () => {
    const { sut, getTenantByTokenSpy } = makeSut()
    jest.spyOn(getTenantByTokenSpy, 'getTenant').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if GetTenantByToken returns a tenent', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toBeTruthy()
  })

  test('Should return 403 if GetTenantByToken throws with jwt expired', async () => {
    const { sut, getTenantByTokenSpy } = makeSut()
    jest
      .spyOn(getTenantByTokenSpy, 'getTenant')
      .mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error('jwt expired'))))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized(new ExpiredTokenError()))
  })

  test('Should return 500 if GetTenantByToken throws', async () => {
    const { sut, getTenantByTokenSpy } = makeSut()
    jest
      .spyOn(getTenantByTokenSpy, 'getTenant')
      .mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
