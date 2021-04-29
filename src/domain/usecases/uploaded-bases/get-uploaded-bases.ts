import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'

export interface IGetUploadedBases {
  get(schemaName: string, enrichment?: boolean): Promise<IUploadedBaseModel[]>
}
