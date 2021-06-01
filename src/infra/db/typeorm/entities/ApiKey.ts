import 'reflect-metadata'
import { IApiKey } from '@/domain/models/api-key'
import { IUser } from '@/domain/models/campaign/user'
import { IOrganization } from '@/domain/models/organization'
import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Column,
  JoinColumn
} from 'typeorm'

@Entity({ name: 'api_keys' })
export class ApiKey implements IApiKey {
  @ManyToOne('Organization', 'api_keys')
  @JoinColumn({ name: 'organization_uuid' })
  organization: IOrganization

  @ManyToOne('User', 'api_keys')
  @JoinColumn({ name: 'user_uuid' })
  user: IUser

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
