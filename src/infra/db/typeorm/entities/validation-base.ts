import { ValidationResults } from '@/domain/models/validation-bases/validation-results'
import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'validation_bases' })
export class ValidationBase {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  name: string

  @Column({ name: 'store_name' })
  storeName: string

  @Column('jsonb')
  emails: ValidationResults

  @Column('jsonb')
  phones: ValidationResults

  @Column('jsonb')
  addresses: ValidationResults

  @Column({ name: 'user_uuid' })
  userId: string

  @Column()
  finished: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date
}
