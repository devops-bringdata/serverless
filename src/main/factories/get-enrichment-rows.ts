import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { LogControllerDecorator } from '../decorators'
import { IController } from '@/presentation/protocols'
import { GetEnrichmentDataByCampaignController } from '@/presentation/controllers/enrichment/get-enrichment-data-by-campaign'
import { DbFindUploadedDataByGroupId } from '@/data/usecases'
import { FindUploadedDataByGroupIdRepository } from '@/infra/db/typeorm/repositories/uploaded-data/find-rows-to-enrich-repository'
import { FindUploadedBaseRepository } from '@/infra/db/typeorm/repositories/uploaded-bases/find-uploaded-bases-repository'

export const makeGetEnrichmentRowsController = (): IController => {
  const findUploadedDataByGroupIdRepository = new FindUploadedDataByGroupIdRepository()
  const findUploadedBaseRepository = new FindUploadedBaseRepository()
  const findUploadedDataByGroupId = new DbFindUploadedDataByGroupId(findUploadedDataByGroupIdRepository)
  const getEnrichmentRowController = new GetEnrichmentDataByCampaignController(
    findUploadedDataByGroupId,
    findUploadedBaseRepository
  )
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(getEnrichmentRowController, logErrorRepository)
}
