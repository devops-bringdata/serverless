import { Database } from '@/infra/db/typeorm/helpers/Database'
import { random } from 'faker'
import { UpdateCampaignRepository } from '@/infra/db/typeorm/repositories/campaign'
import { mockCampaign } from '../../../../presentation/mocks/campaign'
describe('UpdateCampaignRepository', () => {
  type SutTypes = {
    sut: UpdateCampaignRepository
  }
  const makeSut = (): SutTypes => {
    const sut = new UpdateCampaignRepository()
    return { sut }
  }
  const fakeCampaign = mockCampaign()
  test('should return a campaign if updated', async () => {
    const { sut } = makeSut()
    jest.spyOn(Database.prototype, 'getConnection').mockImplementationOnce((): any =>
      Promise.resolve({
        manager: {
          getRepository: () => {
            return {
              update: () => {
                return Promise.resolve({ raw: [fakeCampaign] })
              }
            }
          }
        }
      })
    )
    const response = await sut.update(fakeCampaign, random.word())
    expect(response).toEqual(fakeCampaign)
  })
})
