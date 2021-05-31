import { IApiKey } from '@/domain/models/api-key'
import { IOrganization } from '@/domain/models/organization'
import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm'

@Entity({ name: 'organizations' })
export class Organization implements IOrganization {
  @OneToMany('ApiKey', 'organization_uuid')
  apiKeys: IApiKey[]

  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column({ name: 'schema_name' })
  schemaName: string

  @Column()
  name: string

  @Column()
  plan: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
