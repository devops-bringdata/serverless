import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { DbFindCampaign } from '@/data/usecases'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { FindCampaignPostgresRepository } from '@/infra/db/typeorm/repositories/campaign'
import { GetEnrichmentRowRepository } from '@/infra/db/typeorm/repositories/uploaded-data'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { GetEnrichmentRowController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

export const makeGetEnrichmentRowController = (): IController => {
  const getEnrichmentRow = new GetEnrichmentRowRepository()
  const findCampaignRepository = new FindCampaignPostgresRepository()
  const findCampaign = new DbFindCampaign(findCampaignRepository)
  const decrypter = new JwtAdapter(process.env.JWT_AUTH_SECRET)
  const getEnrichmentRowController = new GetEnrichmentRowController(getEnrichmentRow, findCampaign, decrypter)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(getEnrichmentRowController, logErrorRepository)
}
