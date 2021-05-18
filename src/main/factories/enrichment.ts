import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { LogControllerDecorator } from '../decorators'
import { IController } from '@/presentation/protocols'
import { FindCampaignPostgresRepository } from '@/infra/db/typeorm/repositories/campaign-repository/find-campaign'
import { DbFindCampaign, DbFindUploadedDataByGroupId, EnrichRow, StartEnrichment } from '@/data/usecases'
import { FindUploadedDataByGroupIdRepository } from '@/infra/db/typeorm/repositories/uploaded-data/find-rows-to-enrich-repository'
import { SendgridAdapter } from '@/infra/email-sender/sendgrid-adapter'
import { UpdateUploadedDataRepository } from '@/infra/db/typeorm/repositories/uploaded-data/update-uploaded-data-repository'
import { DbUpdateUploadedData } from '@/data/usecases/db-update-uploaded-data/db-update-uploaded-data'
import { StartEnrichmentController } from '@/presentation/controllers/enrichment/start-enrichment'

export const makeStartEnrichmentController = (): IController => {
  const findUploadedDataByGroupIdRepository = new FindUploadedDataByGroupIdRepository()
  const findUploadedDataByGroupId = new DbFindUploadedDataByGroupId(findUploadedDataByGroupIdRepository)
  const findCampaignRepository = new FindCampaignPostgresRepository()
  const findCampaign = new DbFindCampaign(findCampaignRepository)
  const emailSender = new SendgridAdapter()
  const updateUploadedDataRepository = new UpdateUploadedDataRepository()
  const updateUploadedData = new DbUpdateUploadedData(updateUploadedDataRepository)
  const encrypter = new JwtAdapter(process.env.JWT_AUTH_SECRET)
  const enrichRow = new EnrichRow(emailSender, updateUploadedData, encrypter)
  const startEnrichment = new StartEnrichment(findUploadedDataByGroupId, findCampaign, enrichRow)
  const startEnrichmentController = new StartEnrichmentController(startEnrichment)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(startEnrichmentController, logErrorRepository)
}
