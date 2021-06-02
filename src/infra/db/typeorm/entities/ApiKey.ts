import 'reflect-metadata'
import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm'

@Entity({ name: 'api_keys' })
export class ApiKey {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column({ name: 'user_uuid' })
  public userId: string

  @Column({ name: 'organization_uuid' })
  public organizationId: string

  @Column()
  key: string

  @Column({ name: 'expiration_date' })
  expirationDate: Date

  @Column({ name: 'webhook_endpoint' })
  webhookEndpoint: string

  @Column({ name: 'schema_name' })
  schemaName: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
