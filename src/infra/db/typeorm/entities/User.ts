import { IApiKey } from '@/domain/models/api-key'
import { IUser } from '@/domain/models/campaign/user'
import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm'

@Entity({ name: 'users' })
export class User implements IUser {
  @OneToMany('ApiKey', 'user_uuid')
  apiKeys: IApiKey[]

  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  phone: string

  @Column()
  role: string

  @Column({ name: 'primary_language' })
  primaryLanguage: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
