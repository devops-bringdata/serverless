import { IUser } from '@/domain/models/campaign/user'
import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User implements IUser {
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
