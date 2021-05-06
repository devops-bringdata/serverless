// import { throwError } from "../../domain/mocks"
import { DbFindCampaign } from '@/data/usecases'
import * as faker from 'faker'
import { FindCampaignRepositorySpy } from '../mocks/mock-db-campaign'

type SutTypes = {
  sut: DbFindCampaign
  findCampaignRepositorySpy: FindCampaignRepositorySpy
}
const makeSut = (): SutTypes => {
  const findCampaignRepositorySpy = new FindCampaignRepositorySpy()
  const sut = new DbFindCampaign(findCampaignRepositorySpy)
  return { sut, findCampaignRepositorySpy }
}
let campaignId: string
let schemaName: string

describe('DbFindCampaignById', () => {
  beforeEach(() => {
    campaignId = faker.random.uuid()
    schemaName = faker.lorem.word(7)
  })
  test('should call findById with correct values', async () => {
    const { sut, findCampaignRepositorySpy } = makeSut()
    await sut.findById('campaign_id', 'any_schema_name')
    expect(findCampaignRepositorySpy.campaignId).toBe('campaign_id')
    expect(findCampaignRepositorySpy.schemaName).toBe('any_schema_name')
  })
  test('Should throw if findById throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'findById').mockImplementationOnce(() => {
      return new Promise((_resolve, reject) => reject(new Error()))
    })
    const promise = sut.findById(campaignId, schemaName)
    await expect(promise).rejects.toThrow()
  })
})
