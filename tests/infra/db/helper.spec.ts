import { Campaign } from '@/infra/db/typeorm/entities'
import { connect, disconnect } from '@/infra/db/typeorm/helpers/connection'
import { Connection } from 'typeorm'

describe('Typeorm Helper', () => {
  beforeAll(async () => {
    disconnect()
  })
  test('should reconnect if database is down', async () => {
    let connection: Connection = await connect('bringdatajest')
    let repository = connection?.manager.getRepository(Campaign)
    expect(repository).toBeTruthy()
  })
})
