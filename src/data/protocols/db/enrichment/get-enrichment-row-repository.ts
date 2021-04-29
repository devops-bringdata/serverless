import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'

export interface IGetEnrichmentRowRepository {
  get(row: string, schemaName: string): Promise<IUploadedDataModel>
}
