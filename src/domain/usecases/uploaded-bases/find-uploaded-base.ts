import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'

export interface IFindUploadedBase {
  find(schemaName: string, group: string): Promise<IUploadedBaseModel>
}
