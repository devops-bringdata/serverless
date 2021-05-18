import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IUpdateUploadedData } from '@/domain/usecases/update-uploaded-data/update-uploaded-data'
import { UploadedData } from '@/infra/db/typeorm/entities/UploadedData'
import { connect } from '../../helpers/connection'

export class UpdateUploadedDataRepository implements IUpdateUploadedData {
  async update(rowId: string, uploadedDataRow: IUploadedDataModel, schemaName: string): Promise<IUploadedDataModel> {
    const uploadedDataRepository = (await connect(schemaName)).manager.getRepository(UploadedData)
    const result: IUploadedDataModel = await uploadedDataRepository
      .update(rowId, uploadedDataRow)
      .then((response) => response.raw[0])
      .catch((error) => {
        console.log(error)
      })
    return result
  }
}
