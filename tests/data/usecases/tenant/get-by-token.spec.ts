import { IDecrypter } from '../../../../src/data/protocols/criptography/decrypter'
import { GetTenantByToken } from '../../../../src/data/usecases/tenant/get-by-token'
const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    decrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}
type SutTypes = {
  sut: GetTenantByToken
  decrypterStub: IDecrypter
}
const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new GetTenantByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}
describe('GetTenantByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.getTenant('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const tenant = await sut.getTenant('any_token')
    expect(tenant).toBeNull()
  })

  test('Should return a tenent on success', async () => {
    const { sut } = makeSut()
    jest
      .spyOn(sut, 'getTenant')
      .mockReturnValueOnce(new Promise((resolve) => resolve({ schemaName: 'any_value', uuid: 'any_id' })))
    const tenant = await sut.getTenant('any_token')
    expect(tenant).toEqual({ schemaName: 'any_value', uuid: 'any_id' })
  })
})
