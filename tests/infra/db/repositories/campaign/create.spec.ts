import { mockCampaignModel } from '../../../../domain/mocks'
import { CreateCampaignPostgresRepository } from '../../../../../src/infra/db/typeorm/repositories/campaign/create'
import { Database } from '@/infra/db/typeorm/helpers/Database'
const mockCampaignData = mockCampaignModel()
describe('Campaign Postgres Repository', () => {
  type SutTypes = {
    sut: CreateCampaignPostgresRepository
  }
  const makeSut = (): SutTypes => {
    const sut = new CreateCampaignPostgresRepository()
    return { sut }
  }
  beforeAll(() => {})
  test('should throw if connect throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'create').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.create(mockCampaignData, 'bringdatajest')
    await expect(promise).rejects.toThrow()
  })
  test('should return a campaign after creation', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(Database.prototype, 'getConnection').mockImplementationOnce((): any =>
      Promise.resolve({
        manager: {
          getRepository: () => {
            return {
              save: () => {
                return mockCampaignModel()
              }
            }
          }
        }
      })
    )
    await sut.create(mockCampaignData, 'bringdatajest')
    expect(spy).toHaveBeenCalled()
  })
})
