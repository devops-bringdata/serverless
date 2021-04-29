import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'

export interface IFindUploadedDataByGroupIdRepository {
  findRows(groupId: string, schemaName: string): Promise<IUploadedDataModel[]>
}
