import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import { ApiKey, Campaign, Credit, Organization, UploadedBase, UploadedData, User, ValidationBase } from '../entities'

/**
 * Database manager class
 */
export class Database {
  private connectionManager: ConnectionManager
  private connection: Connection

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(dbName: string): Promise<Connection> {
    const CONNECTION_NAME = dbName === 'core' ? 'core' : `default`

    if (this.connectionManager.has(CONNECTION_NAME)) {
      console.log(`Database.getConnection()-using existing connection ...${CONNECTION_NAME}`)
      this.connection = this.connectionManager.get(CONNECTION_NAME)

      if (!this.connection.isConnected) {
        this.connection = await this.connection.connect()
      }
    } else {
      console.log(`Database.getConnection()-creating connection ...${dbName === 'core' ? 'core' : 'default'}`)
      const coreEntities = [ApiKey, Organization, User]
      const defaultEntities = [Campaign, UploadedData, UploadedBase, Credit, ValidationBase]
      const connectionOptions: ConnectionOptions = {
        name: dbName === 'core' ? 'core' : 'default',
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '123456',
        database: dbName,
        entities: dbName === 'core' ? coreEntities : defaultEntities
      }

      this.connection = await createConnection(connectionOptions)
    }
    console.log(this.connection)
    return this.connection
  }
}
