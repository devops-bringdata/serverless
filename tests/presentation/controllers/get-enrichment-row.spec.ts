import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { IController } from '@/presentation/protocols'
import { GetEnrichmentRowController } from '@/presentation/controllers/enrichment/get-enrichment-row'
import { GetEnrichmentRowSpy, DecrypterSpy, DbFindCampaignSpy } from '../../data/mocks'
import { random } from 'faker'

type SutTypes = {
  sut: IController
  getEnrichmentRowSpy: GetEnrichmentRowSpy
  decrypterSpy: DecrypterSpy
}
const makeSut = (): SutTypes => {
  const getEnrichmentRowSpy = new GetEnrichmentRowSpy()
  const decrypterSpy = new DecrypterSpy()
  const findCampaignSpy = new DbFindCampaignSpy()
  const sut = new GetEnrichmentRowController(getEnrichmentRowSpy, findCampaignSpy, decrypterSpy)
  return { sut, getEnrichmentRowSpy, decrypterSpy }
}
describe('GetEnrichmentRowController', () => {
  test('should return 400 if no row is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ row: null })
    expect(response).toEqual(badRequest(new MissingParamError('row')))
  })
  test('should call get method with correct row id', async () => {
    const { sut, getEnrichmentRowSpy, decrypterSpy } = makeSut()
    const mockDecryptResponse = {
      uuid: random.uuid(),
      schemaName: random.word()
    }
    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(new Promise((resolve) => resolve(mockDecryptResponse)))
    await sut.handle({ row: 'any_string' })
    expect(getEnrichmentRowSpy.uuid).toBe(mockDecryptResponse.uuid)
    expect(getEnrichmentRowSpy.schemaName).toBe(mockDecryptResponse.schemaName)
  })
})
