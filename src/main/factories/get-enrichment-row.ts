import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { GetEnrichmentRowRepository } from '@/infra/db/typeorm/repositories/uploaded-data/get-enrichment-row-repository'
import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { LogControllerDecorator } from '../decorators'
import { GetEnrichmentRowController } from '@/presentation/controllers/enrichment/get-enrichment-row'
import { IController } from '@/presentation/protocols'
import { FindCampaignPostgresRepository } from '@/infra/db/typeorm/repositories/campaign-repository/find-campaign'
import { DbFindCampaign } from '@/data/usecases'

export const makeGetEnrichmentRowController = (): IController => {
  const getEnrichmentRow = new GetEnrichmentRowRepository()
  const findCampaignRepository = new FindCampaignPostgresRepository()
  const findCampaign = new DbFindCampaign(findCampaignRepository)
  const decrypter = new JwtAdapter(process.env.JWT_AUTH_SECRET)
  const getEnrichmentRowController = new GetEnrichmentRowController(getEnrichmentRow, findCampaign, decrypter)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(getEnrichmentRowController, logErrorRepository)
}
