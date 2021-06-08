import { Database } from '@/infra/db/typeorm/helpers/Database'
import { random } from 'faker'
import { mockCampaignModel } from '../../../../domain/mocks'
import { GetCampaignListRepository } from '@/infra/db/typeorm/repositories/campaign'
describe('GetCampaignListRepository', () => {
  type SutTypes = {
    sut: GetCampaignListRepository
  }
  const makeSut = (): SutTypes => {
    const sut = new GetCampaignListRepository()
    return { sut }
  }
  const fakeCampaign = mockCampaignModel()
  test('should return a campaign if founded', async () => {
    const { sut } = makeSut()
    jest.spyOn(Database.prototype, 'getConnection').mockImplementationOnce((): any =>
      Promise.resolve({
        manager: {
          getRepository: () => {
            return {
              find: () => {
                return [fakeCampaign]
              }
            }
          }
        }
      })
    )
    const response = await sut.getCampaignList(random.word())
    expect(response).toEqual([fakeCampaign])
  })
})
