import { IUpdateUploadedDataRepository } from '@/data/protocols'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IUpdateUploadedData } from '@/domain/usecases'

export class DbUpdateUploadedData implements IUpdateUploadedData {
  constructor(private updateUploadedData: IUpdateUploadedDataRepository) {}
  async update(rowId: string, uploadedDataRow: IUploadedDataModel, schemaName: string): Promise<IUploadedDataModel> {
    let result = await this.updateUploadedData.update(rowId, uploadedDataRow, schemaName)
    return result
  }
}
