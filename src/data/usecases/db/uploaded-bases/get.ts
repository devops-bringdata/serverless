import { IGetUploadedBasesRepository } from '@/data/protocols'
import { IUploadedBaseModel } from '@/domain/models/uploaded-bases/uploaded-bases'
import { IGetUploadedBases } from '@/domain/usecases/uploaded-bases/get-uploaded-bases'

export class GetUploadedBases implements IGetUploadedBases {
  constructor(private getUploadedBasesRepository: IGetUploadedBasesRepository) {}
  get(schemaName: string, enrichment?: boolean): Promise<IUploadedBaseModel[]> {
    return this.getUploadedBasesRepository.get(schemaName, enrichment)
  }
}
