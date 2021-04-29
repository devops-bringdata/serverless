import { StartEnrichment } from '../../../src/data/usecases/start-enrichment/start-enrichment'
import { MissingParamError } from '../../../src/presentation/errors'
import { badRequest } from '../../../src/presentation/helpers'
import { IStartEnrichment } from '../../../src/domain/usecases/enrichment/start-enrichment'
import { DbFindCampaignSpy, EnrichRowSpy, FindUploadedDataByGroupIdSpy } from '../mocks'

type SutTypes = {
  sut: IStartEnrichment
  dbFindUploadedDataByGroupIdSpy: FindUploadedDataByGroupIdSpy
  dbFindCampaignSpy: DbFindCampaignSpy
}

const makeSut = (): SutTypes => {
  const dbFindCampaignSpy = new DbFindCampaignSpy()
  const dbFindUploadedDataByGroupIdSpy = new FindUploadedDataByGroupIdSpy()
  const enrichRowSpy = new EnrichRowSpy()
  const sut = new StartEnrichment(dbFindUploadedDataByGroupIdSpy, dbFindCampaignSpy, enrichRowSpy)
  return { sut, dbFindUploadedDataByGroupIdSpy, dbFindCampaignSpy }
}
describe('Enrichment', () => {
  test('should return 400 if no campaignId is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.start(null, 'any_group_id', 'bringdatajest')
    expect(response).toEqual(badRequest(new MissingParamError('campaignId')))
  })
  test('should return 400 if no groupId is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.start('any_campaign_id', null, 'bringdatajest')
    expect(response).toEqual(badRequest(new MissingParamError('groupId')))
  })
  test('should call findCampaign with correct campaignId', async () => {
    const { sut, dbFindCampaignSpy } = makeSut()
    await sut.start('any_campaign_id', 'any_group_id', 'bringdatajest')
    expect(dbFindCampaignSpy.campaignId).toBe('any_campaign_id')
    expect(dbFindCampaignSpy.schemaName).toBe('bringdatajest')
  })
  test('should call findRows with correct groupId', async () => {
    const { sut, dbFindUploadedDataByGroupIdSpy } = makeSut()
    await sut.start('any_campaign_id', 'any_group_id', 'bringdatajest')
    expect(dbFindUploadedDataByGroupIdSpy.groupId).toBe('any_group_id')
    expect(dbFindUploadedDataByGroupIdSpy.schemaName).toBe('bringdatajest')
  })
})
