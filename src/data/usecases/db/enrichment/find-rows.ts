import { IFindUploadedDataByGroupIdRepository } from '@/data/protocols'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IFindUploadedDataByGroupId } from '@/domain/usecases'

export class DbFindUploadedDataByGroupId implements IFindUploadedDataByGroupId {
  constructor(private findUploadedDataByGroupIdRepository: IFindUploadedDataByGroupIdRepository) {}
  async findRows(groupId: string, schemaName: string): Promise<IUploadedDataModel[]> {
    return this.findUploadedDataByGroupIdRepository.findRows(groupId, schemaName)
  }
}
