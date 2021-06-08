import 'reflect-metadata'
import { IOrganization } from '@/domain/models/organization'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'organizations' })
export class Organization implements IOrganization {
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
