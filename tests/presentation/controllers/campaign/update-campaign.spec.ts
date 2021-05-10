import { UpdateCampaignController } from '@/presentation/controllers'
import { mockCampaignModel } from '../../../../tests/domain/mocks'
import { UpdateCampaignSpy } from '../../mocks/campaign'
import { mockTenant } from '../../mocks/mock-tenant'

type SutTypes = {
  updateCampaignSpy: UpdateCampaignSpy
  sut: UpdateCampaignController
}
const makeSut = (): SutTypes => {
  const updateCampaignSpy = new UpdateCampaignSpy()
  const sut = new UpdateCampaignController(updateCampaignSpy)
  return { sut, updateCampaignSpy }
}
describe('UpdateCampaignController', () => {
  test('should call update with correct values', async () => {
    const { sut, updateCampaignSpy } = makeSut()
    const mockRequest = mockCampaignModel()
    delete mockRequest.uuid
    await sut.handle(mockRequest, mockTenant())
    expect(updateCampaignSpy.campaign).toEqual(mockRequest)
  })
})
