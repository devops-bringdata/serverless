import { IUploadedBaseModel, UploadedBaseModelSave } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IFindUploadedBase } from '@/domain/usecases/uploaded-bases/find-uploaded-base'
import { IUpdateUploadedBase } from '@/domain/usecases/uploaded-bases/update-uploaded-base'
import { mockUploadedBase } from '../../domain/mocks/enrichment'

export class FindUploadedBaseSpy implements IFindUploadedBase {
  schemaName: string
  group: string
  result: IUploadedBaseModel = mockUploadedBase()
  async find(schemaName: string, group: string): Promise<IUploadedBaseModel> {
    this.schemaName = schemaName
    this.group = group
    return this.result
  }
}

export class UpdateUploadedBaseSpy implements IUpdateUploadedBase {
  schemaName: string
  uploadedBase: UploadedBaseModelSave
  uploadedBaseId: string
  update(schemaName: string, uploadedBaseId: string, uploadedBase: UploadedBaseModelSave): Promise<IUploadedBaseModel> {
    this.schemaName = schemaName
    this.uploadedBase = uploadedBase
    this.uploadedBaseId = uploadedBaseId
    return
  }
}
