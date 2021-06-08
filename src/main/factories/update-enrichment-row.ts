import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { ChargeCreditsRepository } from '@/infra/db/typeorm/repositories/credits'
import {
  FindUploadedBaseRepository,
  UpdateUploadedBaseRepository
} from '@/infra/db/typeorm/repositories/uploaded-bases'
import { UpdateUploadedDataRepository, GetEnrichmentRowRepository } from '@/infra/db/typeorm/repositories/uploaded-data'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { UpdateEnrichmentRowController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

export const makeUpdateEnrichmentRowController = (): IController => {
  const updateUploadedData = new UpdateUploadedDataRepository()
  const decrypter = new JwtAdapter(process.env.JWT_AUTH_SECRET)
  const getEnrichmentRowRepository = new GetEnrichmentRowRepository()
  const chargeCreditsRepository = new ChargeCreditsRepository()
  const findUploadedBaseRepository = new FindUploadedBaseRepository()
  const updateUploadedBaseRepository = new UpdateUploadedBaseRepository()
  const updateEnrichmentRowController = new UpdateEnrichmentRowController(
    updateUploadedData,
    decrypter,
    getEnrichmentRowRepository,
    chargeCreditsRepository,
    findUploadedBaseRepository,
    updateUploadedBaseRepository
  )
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(updateEnrichmentRowController, logErrorRepository)
}
