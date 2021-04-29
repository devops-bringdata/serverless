import { IUpdateUploadedDataRepository } from '@/data/protocols/db/enrichment/update-uploaded-data-repository'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IUpdateUploadedData } from '@/domain/usecases/update-uploaded-data/update-uploaded-data'

export class DbUpdateUploadedData implements IUpdateUploadedData {
  constructor(private updateUploadedData: IUpdateUploadedDataRepository) {}
  async update(rowId: string, uploadedDataRow: IUploadedDataModel, schemaName: string): Promise<IUploadedDataModel> {
    let result = await this.updateUploadedData.update(rowId, uploadedDataRow, schemaName)
    return result
  }
}
