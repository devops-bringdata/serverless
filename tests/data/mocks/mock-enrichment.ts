import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IEnrichRow } from '@/domain/usecases'
import { IGetEnrichmentRow } from '@/domain/usecases/enrichment/find-enrichment-row'
import { mockUploadedDataModel } from '../../domain/mocks/uploaded-data'

export class GetEnrichmentRowSpy implements IGetEnrichmentRow {
  uuid: string
  schemaName: string
  result: IUploadedDataModel = mockUploadedDataModel()
  async get(uuid: string, schemaName: string): Promise<IUploadedDataModel> {
    this.uuid = uuid
    this.schemaName = schemaName
    return this.result
  }
}

export class EnrichRowSpy implements IEnrichRow {
  row: IUploadedDataModel
  campaign: ICampaignModel
  schemaName: string
  result
  enrich(row: IUploadedDataModel, campaign: ICampaignModel, schemaName: string): Promise<any> {
    this.row = row
    this.campaign = campaign
    this.schemaName = schemaName
    return
  }
}
