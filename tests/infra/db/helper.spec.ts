import { Campaign } from '@/infra/db/typeorm/entities'
import { disconnect } from '@/infra/db/typeorm/helpers/connection'
import { Database } from '@/infra/db/typeorm/helpers/Database'
import { Connection } from 'typeorm'

describe('Typeorm Helper', () => {
  beforeAll(async () => {
    disconnect()
  })
  test('should reconnect if database is down', async () => {
    const database = new Database()
    let connection: Connection = await database.getConnection('bringdatajest')
    let repository = connection?.manager.getRepository(Campaign)
    expect(repository).toBeTruthy()
  })
})
