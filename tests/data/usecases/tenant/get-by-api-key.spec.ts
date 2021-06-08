import { GetTenantByApiKey } from '@/data/usecases'
import { random } from 'faker'
import { GetApiKeySpy } from '../../mocks/api-key'

type SutTypes = {
  sut: GetTenantByApiKey
  getApiKeySpy: GetApiKeySpy
}
const makeSut = (): SutTypes => {
  const getApiKeySpy = new GetApiKeySpy()
  const sut = new GetTenantByApiKey(getApiKeySpy)
  return {
    sut,
    getApiKeySpy
  }
}
const fakeApiKey = random.alphaNumeric()
describe('GetTenantByToken Usecase', () => {
  test('Should call get with correct api key', async () => {
    const { sut, getApiKeySpy } = makeSut()
    await sut.getTenant(fakeApiKey)
    expect(getApiKeySpy.apiKey).toBe(fakeApiKey)
  })
  test('Should return null if no tenant was found', async () => {
    const { sut, getApiKeySpy } = makeSut()
    jest.spyOn(getApiKeySpy, 'get').mockImplementationOnce(() => Promise.resolve(null))
    const response = await sut.getTenant(fakeApiKey)
    expect(response).toBe(null)
  })
})
