import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { GetUploadedBasesRepository } from '@/infra/db/typeorm/repositories/uploaded-bases'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { GetEnrichmentUploadedBasesController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

export const makeGetEnrichmentUploadedBasesController = (): IController => {
  const getEnrichmentUploadedBasesRepository = new GetUploadedBasesRepository()
  const getEnrichmentUploadedBasesController = new GetEnrichmentUploadedBasesController(
    getEnrichmentUploadedBasesRepository
  )
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(getEnrichmentUploadedBasesController, logErrorRepository)
}
