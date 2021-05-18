import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'uploaded_bases' })
export class UploadedBase {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  group: string

  @Column()
  campaign: string

  @Column({ name: 'file_name' })
  fileName: string

  @Column()
  validated: boolean

  @Column({ name: 'must_enrich' })
  mustEnrich: boolean

  @Column({ name: 'collected_data_quantity' })
  collectedDataQuantity: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
