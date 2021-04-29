import { IGetEnrichmentRowRepository } from '@/data/protocols/db/enrichment/get-enrichment-row-repository'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { UploadedData } from '../../entities/uploaded-data'
import { connect, disconnect } from '../../helpers/connection'

export class GetEnrichmentRowRepository implements IGetEnrichmentRowRepository {
  async get(row: string, schemaName: string): Promise<IUploadedDataModel> {
    const uploadedDataRepository = (await connect(schemaName)).manager.getRepository(UploadedData)
    const result: IUploadedDataModel = await uploadedDataRepository.findOne(row)

    await disconnect()
    return result
  }
}
