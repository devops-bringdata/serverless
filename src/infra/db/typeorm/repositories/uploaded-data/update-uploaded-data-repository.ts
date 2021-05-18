import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IUpdateUploadedData } from '@/domain/usecases/update-uploaded-data/update-uploaded-data'
import { UploadedData } from '@/infra/db/typeorm/entities/UploadedData'
import { Database } from '../../helpers/Database'

export class UpdateUploadedDataRepository implements IUpdateUploadedData {
  async update(rowId: string, uploadedDataRow: IUploadedDataModel, schemaName: string): Promise<IUploadedDataModel> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const uploadedDataRepository = connection.manager.getRepository(UploadedData)
    const result: IUploadedDataModel = await uploadedDataRepository
      .update(rowId, uploadedDataRow)
      .then((response) => response.raw[0])
      .catch((error) => {
        console.log(error)
      })
    return result
  }
}
