import { connect, disconnect } from '@/infra/db/typeorm/helpers/connection'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
const now = new Date()
const mockCampaignData = {
  name: 'valid_name3',
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
  resendDate: now,
  mustEnrich: true,
  groupId: '1610475382166'
}
let accessToken
describe('Campaign routes', () => {
  beforeAll(async () => {
    disconnect()
    await connect('bringdata-jest')
    accessToken = sign({ schemaName: 'bringdata-jest', id: 'any_id' }, '4aa04f57a84d4d1655b7ba575d7f7794')
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

  test('Should return an account on success', async () => {
    const data = JSON.parse(JSON.stringify(mockCampaignData))

    await request('http://localhost:3006')
      .post('/development/campaign')
      .set('authorization', accessToken)
      .send(data)
      .expect(200)
  })

  test('Should return an account on success even missing name', async () => {
    const data = JSON.parse(JSON.stringify(mockCampaignData))
    delete data.name
    const response = await request('http://localhost:3006')
      .post('/development/campaign')
      .set('authorization', accessToken)
      .send(data)
    expect(response.status).toBe(200)
  })

  test('Should return an account on success even missing emailTemplate button Label', async () => {
    const data = JSON.parse(JSON.stringify(mockCampaignData))
    delete data.emailTemplate.buttonLabel
    const response = await request('http://localhost:3006')
      .post('/development/campaign')
      .set('authorization', accessToken)
      .send(data)
    expect(response.status).toBe(200)
  })
})
