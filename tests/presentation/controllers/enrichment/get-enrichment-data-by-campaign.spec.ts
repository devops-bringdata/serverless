import { GetEnrichmentDataByCampaignController } from '@/presentation/controllers/enrichment/get-enrichment-data-by-campaign'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { FindUploadedDataByGroupIdSpy } from '../../../data/mocks/uploaded-data'
import { FindUploadedBaseSpy } from '../../mocks/uploaded-base'
type SutTypes = {
  findUploadedDataByGroupIdSpy: FindUploadedDataByGroupIdSpy
  sut: GetEnrichmentDataByCampaignController
}
const makeSut = (): SutTypes => {
  const findUploadedDataByGroupIdSpy = new FindUploadedDataByGroupIdSpy()
  const findUploadedBaseSpy = new FindUploadedBaseSpy()
  const sut = new GetEnrichmentDataByCampaignController(findUploadedDataByGroupIdSpy, findUploadedBaseSpy)
  return { sut, findUploadedDataByGroupIdSpy }
}
describe('GetEnrichmentDataByCampaign', () => {
  test('should return 400 if no groupId is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(
      { groupId: null },
      {
        schemaName: 'bringdatajest',
        uuid: 'any_id'
      }
    )
    expect(response).toEqual(badRequest(new MissingParamError('groupId')))
  })
  test('should call find rows with correct values', async () => {
    const { sut, findUploadedDataByGroupIdSpy } = makeSut()
    await sut.handle(
      { groupId: 'any_group_id' },
      {
        schemaName: 'bringdatajest',
        uuid: 'any_id'
      }
    )
    expect(findUploadedDataByGroupIdSpy.groupId).toBe('any_group_id')
    expect(findUploadedDataByGroupIdSpy.schemaName).toBe('bringdatajest')
  })
})
