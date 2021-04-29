import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICreateCampaign } from '@/domain/usecases/campaign/create-campaign'
import { ICreateCampaignRepository } from '@/data/protocols/db/campaign/create-campaign-repository'
import { DbCreateCampaign } from '@/data/usecases/db-create-campaign/db-create-campaign'
import { mockCampaignModel } from '../../domain/mocks/campaign'
const now = new Date()
const mockCampaignData = {
  name: 'valid_name',
  owner: 'valid_user_id',
  emailVariable: 'valid_email_variable',
  variables: [
    {
      name: 'valid_variable_name',
      question: 'valid_question'
    }
  ],
  collectWays: ['valid_collect_ways'],
  emailTemplate: {
    buttonLabel: 'some_string',
    fromMail: 'some_string',
    fromName: 'some_string',
    greeting: 'some_string',
    logo: 'some_string',
    subject: 'some_string',
    text: 'some_string',
    title: 'some_string'
  },
  resendDate: now
}
const makeCreateCampaignRepository = (): ICreateCampaignRepository => {
  class CreateCampaignRepositoryStub implements ICreateCampaignRepository {
    async create(_campaign: ICreateCampaign.Params): Promise<ICampaignModel> {
      const fakeCampaign = JSON.parse(JSON.stringify(mockCampaignData))
      return new Promise((resolve) => resolve(fakeCampaign))
    }
  }
  return new CreateCampaignRepositoryStub()
}
type SutTypes = {
  sut: DbCreateCampaign
  createCampaignRepositoryStub: ICreateCampaignRepository
}
const makeSut = (): SutTypes => {
  const createCampaignRepositoryStub = makeCreateCampaignRepository()
  const sut = new DbCreateCampaign(createCampaignRepositoryStub)
  return {
    sut,
    createCampaignRepositoryStub
  }
}
describe('DbCreateCampaign', () => {
  test('Should call CreateCampaignRepository with correct values', async () => {
    const { sut, createCampaignRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createCampaignRepositoryStub, 'create')
    const campaignData: ICreateCampaign.Params = JSON.parse(JSON.stringify(mockCampaignData))
    await sut.create(campaignData, 'bringdata-jest')
    expect(createSpy).toHaveBeenCalledWith(campaignData, 'bringdata-jest')
  })

  test('Should throw if create throws', async () => {
    const { sut, createCampaignRepositoryStub } = makeSut()
    jest
      .spyOn(createCampaignRepositoryStub, 'create')
      .mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.create(mockCampaignModel(), 'bringdata-jest')
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const campaignData: ICreateCampaign.Params = JSON.parse(JSON.stringify(mockCampaignData))
    const account = await sut.create(campaignData, 'bringdata-jest')
    expect(account).toEqual(campaignData)
  })
})
