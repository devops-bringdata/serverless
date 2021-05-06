import { GetCampaignListController } from '@/presentation/controllers/campaign/get-campaign-list'
import { GetCampaignListSpy } from '../../mocks/campaign-list'
import { mockTenant } from '../../mocks/mock-tenant'

type SutTypes = {
  getCampaignListSpy: GetCampaignListSpy
  sut: GetCampaignListController
}
const makeSut = (): SutTypes => {
  const getCampaignListSpy = new GetCampaignListSpy()
  const sut = new GetCampaignListController(getCampaignListSpy)
  return { sut, getCampaignListSpy }
}
const tenant = mockTenant()
describe('GetCampaignListController', () => {
  test('should call getCampaignList with correct schemaName', async () => {
    const { sut, getCampaignListSpy } = makeSut()
    await sut.handle({}, tenant)
    expect(tenant.schemaName).toBe(getCampaignListSpy.schemaName)
  })
})
