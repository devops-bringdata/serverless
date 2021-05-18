import { IGetEnrichmentRowRepository } from '@/data/protocols/db/enrichment/get-enrichment-row-repository'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { UploadedData } from '../../entities/UploadedData'
import { Database } from '../../helpers/Database'

export class GetEnrichmentRowRepository implements IGetEnrichmentRowRepository {
  async get(row: string, schemaName: string): Promise<IUploadedDataModel> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const uploadedDataRepository = connection.manager.getRepository(UploadedData)
    const result: IUploadedDataModel = await uploadedDataRepository.findOne(row)
    return result
  }
}
