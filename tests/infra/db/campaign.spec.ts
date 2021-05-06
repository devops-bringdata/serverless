import { connect, disconnect } from '../../../src/infra/db/typeorm/helpers/connection'
import { CreateCampaignPostgresRepository } from '../../../src/infra/db/typeorm/repositories/campaign-repository/create-campaign'
const now = new Date()
const mockCampaignData = {
  name: 'valid_name',
  owner: 'valid_user_id',
  emailVariable: 'valid_email_variable',
  variables: [
    {
      name: 'valid_variable_name',
      question: 'valid_question',
      history: false,
      variableType: 0,
      lgpdJustification: 'any_lgpd_justification'
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
describe('Campaign Postgres Repository', () => {
  beforeAll(async () => {
    disconnect()
    await connect('bringdatajest')
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
    expect(campaign).toBeTruthy()
    expect(campaign.uuid).toBeTruthy()
    expect(campaign.name).toBe('valid_name')
    expect(campaign.owner).toBe('valid_user_id')
    expect(campaign.variables).toEqual([
      {
        name: 'valid_variable_name',
        question: 'valid_question',
        history: false,
        variableType: 0,
        lgpdJustification: 'any_lgpd_justification'
      }
    ])
    expect(campaign.collectWays).toEqual(['valid_collect_ways'])
    expect(campaign.emailTemplate).toEqual({
      buttonLabel: 'some_string',
      fromMail: 'some_string',
      fromName: 'some_string',
      greeting: 'some_string',
      logo: 'some_string',
      subject: 'some_string',
      text: 'some_string',
      title: 'some_string'
    })
    expect(campaign.resendDate).toEqual(now)
  })
  test('should throw if connect throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'create').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.create(mockCampaignData, 'bringdatajest')
    await expect(promise).rejects.toThrow()
  })
  test('should throw if connect throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'create').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.create(mockCampaignData, 'bringdatajest')
    await expect(promise).rejects.toThrow()
  })
})
