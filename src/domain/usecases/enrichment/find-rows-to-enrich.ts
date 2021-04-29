import { IUploadedDataModel } from 'domain/models/uploaded-data/uploaded-data'

export interface IFindUploadedDataByGroupId {
  findRows(groupId: string, schemaName: string): Promise<IUploadedDataModel[]>
}
