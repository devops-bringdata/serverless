import { IFindUploadedDataByGroupIdRepository } from '@/data/protocols/db/enrichment/find-rows-to-enrich'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IFindUploadedDataByGroupId } from '@/domain/usecases/enrichment/find-rows-to-enrich'

export class DbFindUploadedDataByGroupId implements IFindUploadedDataByGroupId {
  constructor(private findUploadedDataByGroupIdRepository: IFindUploadedDataByGroupIdRepository) {}
  async findRows(groupId: string, schemaName: string): Promise<IUploadedDataModel[]> {
    return this.findUploadedDataByGroupIdRepository.findRows(groupId, schemaName)
  }
}
