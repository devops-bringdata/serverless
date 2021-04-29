import { IGetEnrichmentRowRepository } from '@/data/protocols/db/enrichment/get-enrichment-row-repository'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IGetEnrichmentRow } from '@/domain/usecases/enrichment/find-enrichment-row'

export class DbGetEnrichmentRow implements IGetEnrichmentRow {
  constructor(private getEnrichmentRowRepository: IGetEnrichmentRowRepository) {}
  get(uuid: string, schemaName: string): Promise<IUploadedDataModel> {
    return this.getEnrichmentRowRepository.get(uuid, schemaName)
  }
}
