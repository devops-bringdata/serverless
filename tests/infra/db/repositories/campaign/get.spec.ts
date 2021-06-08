import { Database } from '@/infra/db/typeorm/helpers/Database'
import { datatype, random } from 'faker'
import { mockCampaignModel } from '../../../../domain/mocks'
import { GetCampaignRepository } from '@/infra/db/typeorm/repositories/campaign'
describe('GetCampaignRepository', () => {
  type SutTypes = {
    sut: GetCampaignRepository
  }
  const makeSut = (): SutTypes => {
    const sut = new GetCampaignRepository()
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
              findOne: () => {
                return fakeCampaign
              }
            }
          }
        }
      })
    )
    const response = await sut.get(datatype.uuid(), random.word())
    expect(response).toEqual(fakeCampaign)
  })
})
