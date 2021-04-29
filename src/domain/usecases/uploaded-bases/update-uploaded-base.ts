import { IUploadedBaseModel, UploadedBaseModelSave } from '@/domain/models/uploaded-bases/uploaded-bases'

export interface IUpdateUploadedBase {
  update(schemaName: string, uploadedBaseId: string, uploadedBase: UploadedBaseModelSave): Promise<IUploadedBaseModel>
}
