import { StartEnrichment } from '@/data/usecases'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers'
import { FindUploadedDataByGroupIdSpy } from '../../../../data/mocks/uploaded-data'
import { mockCampaignModel } from '../../../../domain/mocks'
import { FindCampaignRepositorySpy, EnrichRowSpy } from '../../../mocks'

type SutTypes = {
  sut: StartEnrichment
  findUploadedDataByGroupIdSpy: FindUploadedDataByGroupIdSpy
  findCampaignSpy: FindCampaignRepositorySpy
  enrichRowSpy: EnrichRowSpy
}
const makeSut = (): SutTypes => {
  const findUploadedDataByGroupIdSpy = new FindUploadedDataByGroupIdSpy()
  const findCampaignSpy = new FindCampaignRepositorySpy()
  const enrichRowSpy = new EnrichRowSpy()
  const sut: StartEnrichment = new StartEnrichment(findUploadedDataByGroupIdSpy, findCampaignSpy, enrichRowSpy)
  return { sut, findUploadedDataByGroupIdSpy, findCampaignSpy, enrichRowSpy }
}
describe('StartEnrichment', () => {
  test('should return 400 if no campaignId is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.start(null, 'any_group_id', 'any_schema_name')
    expect(httpResponse).toEqual(badRequest(new MissingParamError('campaignId')))
  })
  test('should return 400 if no groupId is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.start('campaign_id', null, 'any_schema_name')
    expect(httpResponse).toEqual(badRequest(new MissingParamError('groupId')))
  })
  test('should call dbFindCampaign.findById with correct values', async () => {
    const { sut, findCampaignSpy } = makeSut()
    await sut.start('any_campaign_id', 'any_group_id', 'any_schema_name')
    expect(findCampaignSpy.campaignId).toBe('any_campaign_id')
    expect(findCampaignSpy.schemaName).toBe('any_schema_name')
  })
  test('should return 500 if no campaign was found', async () => {
    const { sut, findCampaignSpy } = makeSut()
    jest.spyOn(findCampaignSpy, 'findById').mockReturnValueOnce(null)
    const httpResponse = await sut.start('wrong_campaign_id', 'any_group_id', 'any_schema_name')
    expect(httpResponse).toEqual(serverError(new ServerError('Campaign not found on start enrichment')))
  })
  test('should call DbFindUploadedDataByGroupId.findRows with correct values', async () => {
    const { sut, findUploadedDataByGroupIdSpy } = makeSut()
    await sut.start('any_campaign_id', 'any_group_id', 'any_schema_name')
    expect(findUploadedDataByGroupIdSpy.groupId).toBe('any_group_id')
    expect(findUploadedDataByGroupIdSpy.schemaName).toBe('any_schema_name')
  })
  test('should call enrichRow.enrich with correct values', async () => {
    const { sut, findCampaignSpy, enrichRowSpy } = makeSut()
    // const enrichRowSpy = jest.spyOn(enrichRowStub, "enrich")
    const mockCampaing = mockCampaignModel()
    jest.spyOn(findCampaignSpy, 'findById').mockReturnValueOnce(new Promise((resolve) => resolve(mockCampaing)))
    await sut.start('any_campaign_id', 'any_group_id', 'any_schema_name')
    expect(enrichRowSpy.campaign).toEqual(mockCampaing)
  })
})
