import { GetOrganizationByApiKey } from '@/data/usecases'
import { GetOrganizationByApiKeySpy } from '../../../../data/mocks/organization'
import { random } from 'faker'

type SutTypes = {
  sut: GetOrganizationByApiKey
  getOrganizationByApiKeySpy: GetOrganizationByApiKeySpy
}
const makeSut = (): SutTypes => {
  const getOrganizationByApiKeySpy = new GetOrganizationByApiKeySpy()
  const sut = new GetOrganizationByApiKey(getOrganizationByApiKeySpy)
  return { sut, getOrganizationByApiKeySpy }
}
const fakeApiKey = random.alphaNumeric(15)
describe('GetOrganizationByApiKey', () => {
  test('should call get with correct values', async () => {
    const { sut, getOrganizationByApiKeySpy } = makeSut()
    await sut.get(fakeApiKey)
    expect(getOrganizationByApiKeySpy.apiKey).toBe(fakeApiKey)
  })
})
