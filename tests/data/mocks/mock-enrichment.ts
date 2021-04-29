import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IEnrichRow, IFindUploadedDataByGroupId } from '@/domain/usecases'
import { IGetEnrichmentRow } from '@/domain/usecases/enrichment/find-enrichment-row'
import { IUpdateUploadedData } from '@/domain/usecases/update-uploaded-data/update-uploaded-data'
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

export class UpdateUploadedDataSpy implements IUpdateUploadedData {
  rowId: string
  uploadedDataRow: IUploadedDataModel
  schemaName: string
  result: IUploadedDataModel = mockUploadedDataModel()
  async update(rowId: string, uploadedDataRow: IUploadedDataModel, schemaName: string): Promise<IUploadedDataModel> {
    this.rowId = rowId
    this.uploadedDataRow = uploadedDataRow
    this.schemaName = schemaName
    return this.result
  }
}

export class FindUploadedDataByGroupIdSpy implements IFindUploadedDataByGroupId {
  groupId: string
  schemaName: string
  result: Array<IUploadedDataModel> = [mockUploadedDataModel()]
  async findRows(groupId: string, schemaName: string): Promise<IUploadedDataModel[]> {
    this.groupId = groupId
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
