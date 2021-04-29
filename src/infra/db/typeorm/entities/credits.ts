import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'credits' })
export class Credit {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  id: number

  @Column({ name: 'total_after_operation' })
  totalAfterOperation: number

  @Column({ name: 'operation_amount' })
  operationAmount: number

  @Column()
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
