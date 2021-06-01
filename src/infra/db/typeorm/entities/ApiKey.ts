import 'reflect-metadata'
import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm'

@Entity({ name: 'api_keys' })
export class ApiKey {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  public user_uuid: string

  @Column()
  public organization_uuid: string

  @Column()
  key: string

  @Column({ name: 'expiration_date' })
  expirationDate: Date

  @Column({ name: 'webhook_endpoint' })
  webhookEndpoint: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
