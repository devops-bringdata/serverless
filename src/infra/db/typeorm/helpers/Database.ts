import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import { Campaign, Credit, UploadedBase, UploadedData, ValidationBase } from '../entities'

/**
 * Database manager class
 */
export class Database {
  private connectionManager: ConnectionManager

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(dbName: string): Promise<Connection> {
    const CONNECTION_NAME = `default`

    let connection: Connection

    if (this.connectionManager.has(CONNECTION_NAME)) {
      console.log(`Database.getConnection()-using existing connection ...`)
      connection = await this.connectionManager.get(CONNECTION_NAME)

      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    } else {
      console.log(`Database.getConnection()-creating connection ...`)

      const connectionOptions: ConnectionOptions = {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '123456',
        database: dbName,
        entities: [Campaign, UploadedData, UploadedBase, Credit, ValidationBase]
      }

      connection = await createConnection(connectionOptions)
    }

    return connection
  }
}
