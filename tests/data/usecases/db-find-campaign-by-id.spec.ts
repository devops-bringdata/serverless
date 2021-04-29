// import { throwError } from "../../domain/mocks"
import * as faker from 'faker'
import { DbFindCampaignSpy } from '../mocks/mock-db-campaign'

type SutTypes = {
  sut: DbFindCampaignSpy
}
const makeSut = (): SutTypes => {
  const sut = new DbFindCampaignSpy()
  return { sut }
}
let campaignId: string
let schemaName: string

describe('DbFindCampaignById', () => {
  beforeEach(() => {
    campaignId = faker.random.uuid()
    schemaName = faker.lorem.word(7)
  })
  test('should call findById with correct values', async () => {
    const { sut } = makeSut()
    await sut.findById('campaign_id', 'any_schema_name')
    expect(sut.campaignId).toBe('campaign_id')
    expect(sut.schemaName).toBe('any_schema_name')
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
