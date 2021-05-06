import { GetCampaignListRepository } from '@/infra/db/typeorm/repositories/campaign-repository/get-campaign-list'

type SutTypes = {
  sut: GetCampaignListRepository
}
const makeSut = (): SutTypes => {
  const sut = new GetCampaignListRepository()
  return { sut }
}
describe('GetCampaignListRepository', () => {
  test('should call find', async () => {
    const { sut } = makeSut()
    const getCampainListSpy = jest.spyOn(sut, 'getCampaignList')
    await sut.getCampaignList('bringdatajest')
    expect(getCampainListSpy).toHaveBeenCalled()
  })
})
