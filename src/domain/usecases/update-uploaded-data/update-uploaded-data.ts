import { IUploadedDataModel } from 'domain/models/uploaded-data/uploaded-data'

export interface IUpdateUploadedData {
  update(rowId: string, uploadedDataRow: IUploadedDataModel, schemaName: string): Promise<IUploadedDataModel>
}
