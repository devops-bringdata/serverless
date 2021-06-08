import { JwtAdapter } from '../../../src/infra/criptography/jwt-adapter'
import jwt from 'jsonwebtoken'
jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any_token'
  },

  async verify(): Promise<string> {
    return 'any_value'
  }
}))
describe('JWT Adapter', () => {
  const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
  }
  test('Should call verify with correct values', async () => {
    const sut = makeSut()
    const verifySpy = jest.spyOn(jwt, 'verify')
    await sut.decrypt('any_token')
    expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
  })

  test('Should return a value on encrypt', async () => {
    const sut = makeSut()
    const value = await sut.encrypt('any_token')
    expect(value).toBeTruthy()
  })

  test('Should call format with correct values', async () => {
    const sut = makeSut()
    const formatSpy = jest.spyOn(sut, 'format')
    sut.decrypt('Bearer any_token')
    expect(formatSpy).toHaveBeenCalledWith('Bearer any_token')
  })
})
