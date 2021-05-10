import { DeleteCampaignController } from '@/presentation/controllers/campaign/delete-campaign'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { DeleteCampaignSpy } from '../../mocks/campaign'
import { mockTenant } from '../../mocks/mock-tenant'

type SutTypes = {
  deleteCampaignSpy: DeleteCampaignSpy
  sut: DeleteCampaignController
}
const makeSut = (): SutTypes => {
  const deleteCampaignSpy = new DeleteCampaignSpy()
  const sut = new DeleteCampaignController(deleteCampaignSpy)
  return { sut, deleteCampaignSpy }
}
describe('DeleteCampaignController', () => {
  test('should return 400 if no campaignId was passed', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ campaignId: null })
    expect(response).toEqual(badRequest(new MissingParamError('campaignId')))
  })
  test('should call delete with correct campaignId', async () => {
    const { sut, deleteCampaignSpy } = makeSut()
    await sut.handle({ campaignId: 'any_id' }, mockTenant())
    expect(deleteCampaignSpy.campaignId).toBe('any_id')
  })
})
