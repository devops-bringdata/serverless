import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { LogControllerDecorator } from '../decorators'
import { IController } from '@/presentation/protocols'
import { UpdateEnrichmentRowController } from '@/presentation/controllers/enrichment/update-enrichment-row'
import { UpdateUploadedDataRepository } from '@/infra/db/typeorm/repositories/uploaded-data/update-uploaded-data-repository'
import { GetEnrichmentRowRepository } from '@/infra/db/typeorm/repositories/uploaded-data/get-enrichment-row-repository'
import { ChargeCreditsRepository } from '@/infra/db/typeorm/repositories/credits-repository/charge-credits'
import { FindUploadedBaseRepository } from '@/infra/db/typeorm/repositories/uploaded-bases/find-uploaded-bases-repository'
import { UpdateUploadedBaseRepository } from '@/infra/db/typeorm/repositories/uploaded-bases/update-uploaded-bases-repository'

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
