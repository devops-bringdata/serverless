import { DuplicateCampaignController } from '@/presentation/controllers/campaign/duplicate-campaign'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { DuplicateCampaignSpy } from '../../mocks/campaign'
import { mockTenant } from '../../mocks/mock-tenant'

type SutTypes = {
  duplicateCampaignSpy: DuplicateCampaignSpy
  sut: DuplicateCampaignController
}
const makeSut = (): SutTypes => {
  const duplicateCampaignSpy = new DuplicateCampaignSpy()
  const sut = new DuplicateCampaignController(duplicateCampaignSpy)
  return { sut, duplicateCampaignSpy }
}
describe('DuplicateCampaignController', () => {
  test('should return 400 if no campaignId is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ campaignId: null }, mockTenant())
    expect(response).toEqual(badRequest(new MissingParamError('campaignId')))
  })
  test('should call duplicate with correct values', async () => {
    const { sut, duplicateCampaignSpy } = makeSut()
    await sut.handle({ campaignId: 'any_id' }, mockTenant())
    expect(duplicateCampaignSpy.campaignId).toBe('any_id')
  })
})
