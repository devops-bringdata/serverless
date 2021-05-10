import { GetCampaignController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { GetCampaignSpy } from '../../mocks/campaign'
import { mockTenant } from '../../mocks/mock-tenant'

type SutTypes = {
  getCampaignSpy: GetCampaignSpy
  sut: GetCampaignController
}
const makeSut = (): SutTypes => {
  const getCampaignSpy = new GetCampaignSpy()
  const sut = new GetCampaignController(getCampaignSpy)
  return { sut, getCampaignSpy }
}
describe('GetCampaignController', () => {
  test('should return 400 if no campaignId was passed', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ campaignId: null })
    expect(response).toEqual(badRequest(new MissingParamError('campaignId')))
  })
  test('should call get with correct campaignId', async () => {
    const { sut, getCampaignSpy } = makeSut()
    await sut.handle({ campaignId: 'any_id' }, mockTenant())
    expect(getCampaignSpy.campaignId).toBe('any_id')
  })
})
