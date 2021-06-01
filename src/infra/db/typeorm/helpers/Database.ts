import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import { ApiKey, Campaign, Credit, Organization, UploadedBase, UploadedData, User, ValidationBase } from '../entities'

/**
 * Database manager class
 */
export class Database {
  private connectionManager: ConnectionManager
  private coreConnection: Connection
  private defaultConnection: Connection

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(dbName: string): Promise<Connection> {
    const CONNECTION_NAME = dbName === 'core' ? 'core' : `default`

    if (this.connectionManager.has(CONNECTION_NAME)) {
      console.log(`Database.getConnection()-using existing connection ...${CONNECTION_NAME}`)
      this.coreConnection = this.connectionManager.get('core')
      this.defaultConnection = this.connectionManager.get('default')

      if (!this.coreConnection.isConnected) {
        this.coreConnection = await this.coreConnection.connect()
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
      if (dbName === 'core') this.coreConnection = await createConnection(connectionOptions)
      if (dbName === 'default') this.defaultConnection = await createConnection(connectionOptions)
    }
    console.log('core connection', this.coreConnection)
    console.log('default connection', this.coreConnection)
    return dbName === 'core' ? this.coreConnection : this.defaultConnection
  }
}
