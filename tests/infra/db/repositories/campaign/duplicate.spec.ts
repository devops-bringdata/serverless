import { Database } from '@/infra/db/typeorm/helpers/Database'
import { DuplicateCampaignRepository } from '@/infra/db/typeorm/repositories/campaign'
import { datatype, random } from 'faker'
import { ok } from '@/presentation/helpers'
import { mockCampaignModel } from '../../../../domain/mocks'
describe('Campaign Postgres Repository', () => {
  type SutTypes = {
    sut: DuplicateCampaignRepository
  }
  const makeSut = (): SutTypes => {
    const sut = new DuplicateCampaignRepository()
    return { sut }
  }
  const fakeCampaign = mockCampaignModel()
  test('should return ok if duplicated', async () => {
    const { sut } = makeSut()
    jest.spyOn(Database.prototype, 'getConnection').mockImplementationOnce((): any =>
      Promise.resolve({
        manager: {
          getRepository: () => {
            return {
              findOne: () => {
                return fakeCampaign
              },
              save: () => {
                return fakeCampaign
              }
            }
          }
        }
      })
    )
    const response = await sut.duplicate(datatype.uuid(), random.word())
    expect(response).toEqual(ok(fakeCampaign))
  })
})
