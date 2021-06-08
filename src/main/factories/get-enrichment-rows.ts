import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { DbFindUploadedDataByGroupId } from '@/data/usecases'
import { FindUploadedBaseRepository } from '@/infra/db/typeorm/repositories/uploaded-bases'
import { FindUploadedDataByGroupIdRepository } from '@/infra/db/typeorm/repositories/uploaded-data'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { GetEnrichmentDataByCampaignController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

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
