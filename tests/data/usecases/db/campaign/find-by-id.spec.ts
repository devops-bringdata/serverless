import { DbFindCampaign } from '@/data/usecases'
import { FindCampaignRepositorySpy } from '../../../../data/mocks'
import { datatype, lorem } from 'faker'

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
    campaignId = datatype.uuid()
    schemaName = lorem.word(7)
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
