import 'reflect-metadata'
import { RowContent } from '@/domain/models/uploaded-data/row-content'
import * as IRowValidation from '@/domain/models/uploaded-data/row-validation'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { IRowEnrichment } from '@/domain/models/uploaded-data/row-enrichment'

@Entity({ name: 'uploaded_data' })
export class UploadedData {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column({ name: 'uploaded_data_group' })
  uploadedDataGroup: string

  @Column()
  row_number: number

  @Column('jsonb')
  row_content: RowContent[]

  @Column('jsonb')
  row_validation: IRowValidation.default

  @Column('jsonb')
  row_enrichment: IRowEnrichment[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date
}
