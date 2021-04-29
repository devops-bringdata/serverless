import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'

export interface IEnrichRow {
  enrich(row: IUploadedDataModel, campaign: ICampaignModel, schemaName: string): Promise<any>
}
