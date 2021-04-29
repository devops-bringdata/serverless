import { createConnection, Connection, getConnectionManager } from 'typeorm'
import { Campaign, Credit, UploadedBase, UploadedData, ValidationBase } from '../entities'

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
    entities: [Campaign, UploadedData, UploadedBase, Credit, ValidationBase]
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
