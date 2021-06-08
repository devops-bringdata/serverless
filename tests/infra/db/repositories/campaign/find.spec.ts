import { Database } from '@/infra/db/typeorm/helpers/Database'
import { datatype, random } from 'faker'
import { mockCampaignModel } from '../../../../domain/mocks'
import { FindCampaignPostgresRepository } from '@/infra/db/typeorm/repositories/campaign'
describe('Campaign Postgres Repository', () => {
  type SutTypes = {
    sut: FindCampaignPostgresRepository
  }
  const makeSut = (): SutTypes => {
    const sut = new FindCampaignPostgresRepository()
    return { sut }
  }
  const fakeCampaign = mockCampaignModel()
  test('should return ok if founded', async () => {
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
    const response = await sut.findById(datatype.uuid(), random.word())
    expect(response).toEqual(fakeCampaign)
  })
})
