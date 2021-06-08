import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import {
  DbFindUploadedDataByGroupId,
  DbFindCampaign,
  DbUpdateUploadedData,
  EnrichRow,
  StartEnrichment
} from '@/data/usecases'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { FindCampaignPostgresRepository } from '@/infra/db/typeorm/repositories/campaign'
import {
  FindUploadedDataByGroupIdRepository,
  UpdateUploadedDataRepository
} from '@/infra/db/typeorm/repositories/uploaded-data'
import { SendgridAdapter } from '@/infra/email-sender/sendgrid-adapter'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { StartEnrichmentController } from '@/presentation/controllers/enrichment/start-enrichment'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

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
