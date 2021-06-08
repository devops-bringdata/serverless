import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { FindUploadedDataByGroupIdRepository } from '@/infra/db/typeorm/repositories/uploaded-data'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { DownloadEnrichedBaseController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

export const makeDownloadEnrichedBaseController = (): IController => {
  const findUploadedDataByGroupIdRepository = new FindUploadedDataByGroupIdRepository()
  const downloadEnrichedBaseController = new DownloadEnrichedBaseController(findUploadedDataByGroupIdRepository)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(downloadEnrichedBaseController, logErrorRepository)
}
