import { IGetEnrichmentRowRepository } from '@/data/protocols'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IGetEnrichmentRow } from '@/domain/usecases'

export class DbGetEnrichmentRow implements IGetEnrichmentRow {
  constructor(private getEnrichmentRowRepository: IGetEnrichmentRowRepository) {}
  get(uuid: string, schemaName: string): Promise<IUploadedDataModel> {
    return this.getEnrichmentRowRepository.get(uuid, schemaName)
  }
}
