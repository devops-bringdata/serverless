import { IFindUploadedDataByGroupIdRepository } from '@/data/protocols/db/enrichment/find-rows-to-enrich'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { UploadedData } from '../../entities/uploaded-data'
import { connect, disconnect } from '../../helpers/connection'

export class FindUploadedDataByGroupIdRepository implements IFindUploadedDataByGroupIdRepository {
  async findRows(groupId: string, schemaName: string): Promise<IUploadedDataModel[]> {
    const uploadedDataRepository = (await connect(schemaName)).manager.getRepository(UploadedData)
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
    await disconnect()
    return new Promise((resolve) => resolve(result))
  }
}
