import { createConnection, Connection, getConnectionManager } from 'typeorm'
import { ApiKey } from '../entities/ApiKey'
import { Campaign } from '../entities/Campaign'
import { Credit } from '../entities/Credits'
import { Organization } from '../entities/Organization'
import { UploadedBase } from '../entities/UploadedBase'
import { UploadedData } from '../entities/UploadedData'
import { User } from '../entities/User'
import { ValidationBase } from '../entities/ValidationBase'

let connection: Connection
export async function connect(dbName: string): Promise<Connection> {
  if (connection?.isConnected) return connection
  connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    database: dbName,
    entities: [ApiKey, Campaign, Credit, Organization, UploadedBase, UploadedData, User, ValidationBase]
  }).catch((error) => {
    if (error.name === 'AlreadyHasActiveConnectionError') {
      const existentConn = getConnectionManager().get('default')
      return existentConn
    }
  })
  return connection
}
export async function disconnect(): Promise<void> {
  if (connection) return connection.close()
  this.connection = null
}
