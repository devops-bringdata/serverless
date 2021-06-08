import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import { ApiKey, Campaign, Credit, UploadedBase, UploadedData, ValidationBase } from '../entities'

/**
 * Database manager class
 */
export class Database {
  connectionManager: ConnectionManager
  CONNECTION_NAME: string
  connection: Connection
  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(dbName: string): Promise<Connection> {
    this.CONNECTION_NAME = dbName === 'core' ? 'core' : `default`

    if (this.connectionManager.has(this.CONNECTION_NAME)) {
      if (this.CONNECTION_NAME === 'core') {
        this.connection = this.connectionManager.get('core')
        if (!this.connection.isConnected) {
          this.connection = await this.connection.connect()
        }
      } else {
        this.connection = this.connectionManager.get('default')
        if (!this.connection.isConnected) {
          this.connection = await this.connection.connect()
        }
      }
    } else {
      console.log(`Database.getConnection()-creating connection ...`)

      const coreOptions: ConnectionOptions = {
        name: 'core',
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '123456',
        database: dbName,
        entities: [ApiKey]
      }

      const defaultOptions: ConnectionOptions = {
        name: 'default',
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '123456',
        database: dbName,
        entities: [Campaign, UploadedData, UploadedBase, Credit, ValidationBase]
      }
      if (this.CONNECTION_NAME === 'core') {
        this.connection = await createConnection(coreOptions)
      } else {
        this.connection = await createConnection(defaultOptions)
      }
    }

    return this.connection
  }

  public async disconnect() {
    if (this.connection) return await this.connection.close()
  }
}
