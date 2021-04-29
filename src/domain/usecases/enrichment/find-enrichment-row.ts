import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'

export interface IGetEnrichmentRow {
  get(uuid: string, schemaName: string): Promise<IUploadedDataModel>
}
