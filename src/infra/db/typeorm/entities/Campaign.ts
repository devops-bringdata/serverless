import 'reflect-metadata'
import { ICampaignVariablesModel } from '@/domain/models/campaign/campaignVariables'
import * as IEmailTemplateModel from '@/domain/models/campaign/emailTemplate'
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'campaigns' })
export class Campaign {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  name: string

  @Column()
  owner: string

  @Column()
  emailVariable: string

  @Column('jsonb')
  variables: Array<ICampaignVariablesModel>

  @Column('varchar', { array: true })
  collectWays: string[]

  @Column('jsonb')
  emailTemplate: IEmailTemplateModel.default

  @Column({ nullable: true })
  resendDate: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
