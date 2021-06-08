import { IFindUploadedDataByGroupIdRepository } from '@/data/protocols'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { UploadedData } from '../../entities'
import { Database } from '../../helpers/Database'

export class FindUploadedDataByGroupIdRepository implements IFindUploadedDataByGroupIdRepository {
  async findRows(groupId: string, schemaName: string): Promise<IUploadedDataModel[]> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const uploadedDataRepository = connection.manager.getRepository(UploadedData)
    const result: IUploadedDataModel[] = await uploadedDataRepository
      .find({
        where: { uploadedDataGroup: groupId }
      })
      .then((data) => {
        return data.map((uploadedData) => ({
          uuid: uploadedData.uuid,
          uploadedDataGroup: uploadedData.uploadedDataGroup,
          row_number: uploadedData.row_number,
          row_content: uploadedData.row_content,
          row_validation: uploadedData.row_validation,
          row_enrichment: uploadedData.row_enrichment
        }))
      })
      .catch((error) => {
        throw error
      })
    return new Promise((resolve) => resolve(result))
  }
}
