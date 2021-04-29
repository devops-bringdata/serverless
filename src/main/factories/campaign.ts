import { CampaignController } from '@/presentation/controllers/campaign/campaign'
import {
  DbCreateCampaign,
  DbFindCampaign,
  DbFindUploadedDataByGroupId,
  EnrichRow,
  StartEnrichment
} from '@/data/usecases'
import { CreateCampaignPostgresRepository } from '@/infra/db/typeorm/repositories/campaign-repository/create-campaign'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'
import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { FindUploadedDataByGroupIdRepository } from '@/infra/db/typeorm/repositories/uploaded-data/find-rows-to-enrich-repository'
import { makeCampaignValidation } from './campaign-validation'
import { FindCampaignPostgresRepository } from '@/infra/db/typeorm/repositories/campaign-repository/find-campaign'
import { SendgridAdapter } from '@/infra/email-sender/sendgrid-adapter'
import { DbUpdateUploadedData } from '@/data/usecases/db-update-uploaded-data/db-update-uploaded-data'
import { UpdateUploadedDataRepository } from '@/infra/db/typeorm/repositories/uploaded-data/update-uploaded-data-repository'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'

export const makeCampaignController = (): IController => {
  const campaignRepository = new CreateCampaignPostgresRepository()
  const createCampaign = new DbCreateCampaign(campaignRepository)
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
  const campaignController = new CampaignController(makeCampaignValidation(), createCampaign, startEnrichment)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(campaignController, logErrorRepository)
}
