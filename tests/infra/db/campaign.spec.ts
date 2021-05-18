import { mockCampaignModel } from '../../../tests/domain/mocks'
import { connect, disconnect } from '../../../src/infra/db/typeorm/helpers/connection'
import { CreateCampaignPostgresRepository } from '../../../src/infra/db/typeorm/repositories/campaign-repository/create-campaign'
import { Database } from '@/infra/db/typeorm/helpers/Database'
const mockCampaignData = mockCampaignModel()
describe('Campaign Postgres Repository', () => {
  beforeAll(async () => {
    disconnect()
    const database = new Database()
    await database.getConnection('bringdatajest')
  })

  beforeEach(async () => {
    // // Fetch all the entities
    // const entities = getConnection().entityMetadatas
    // for (const entity of entities) {
    //   const repository = getConnection().getRepository(entity.name) // Get repository
    //   // Get repository
    //   await repository.clear() // Clear each entity table's content
    // }
  })

  afterAll(async () => {
    disconnect()
  })
  type SutTypes = {
    sut: CreateCampaignPostgresRepository
  }
  const makeSut = (): SutTypes => {
    const sut = new CreateCampaignPostgresRepository()
    return { sut }
  }
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const campaign = await sut.create(mockCampaignData, 'bringdatajest')
    // expect(campaign).toEqual(mockCampaignData)
    expect(campaign.uuid).toBe(mockCampaignData.uuid)
    expect(campaign.name).toBe(mockCampaignData.name)
    expect(campaign.owner).toBe(mockCampaignData.owner)
    expect(campaign.variables).toEqual(mockCampaignData.variables)
    expect(campaign.collectWays).toEqual(mockCampaignData.collectWays)
    expect(campaign.emailTemplate).toEqual(mockCampaignData.emailTemplate)
    expect(campaign.resendDate).toBe(mockCampaignData.resendDate)
  })
  test('should throw if connect throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'create').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.create(mockCampaignData, 'bringdatajest')
    await expect(promise).rejects.toThrow()
  })
})
