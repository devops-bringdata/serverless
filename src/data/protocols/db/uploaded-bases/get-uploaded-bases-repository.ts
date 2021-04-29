import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'

export interface IGetUploadedBasesRepository {
  get(schemaName: string, enrichment?: boolean): Promise<IUploadedBaseModel[]>
}
