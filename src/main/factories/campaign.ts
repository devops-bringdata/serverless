import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import {
  DbCreateCampaign,
  DbFindUploadedDataByGroupId,
  DbFindCampaign,
  DbUpdateUploadedData,
  EnrichRow,
  StartEnrichment
} from '@/data/usecases'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import {
  CreateCampaignPostgresRepository,
  FindCampaignPostgresRepository,
  GetCampaignRepository,
  GetCampaignListRepository,
  DeleteCampaignRepository,
  DuplicateCampaignRepository,
  UpdateCampaignRepository
} from '@/infra/db/typeorm/repositories/campaign'
import {
  FindUploadedDataByGroupIdRepository,
  UpdateUploadedDataRepository
} from '@/infra/db/typeorm/repositories/uploaded-data'
import { SendgridAdapter } from '@/infra/email-sender/sendgrid-adapter'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import {
  CreateCampaignController,
  GetCampaignController,
  GetCampaignListController,
  DeleteCampaignController,
  DuplicateCampaignController,
  UpdateCampaignController
} from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'
import { makeCampaignValidation } from './campaign-validation'

export const makeCreateCampaignController = (): IController => {
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
  const campaignController = new CreateCampaignController(makeCampaignValidation(), createCampaign, startEnrichment)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()

  return new LogControllerDecorator(campaignController, logErrorRepository)
}
export const makeGetCampaignController = (): IController => {
  const getCampaignRepository = new GetCampaignRepository()
  const getCampaignController = new GetCampaignController(getCampaignRepository)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(getCampaignController, logErrorRepository)
}
export const makeCreateGetCampaignListController = (): IController => {
  const getCampaignListRepository = new GetCampaignListRepository()
  const getCampaignListController = new GetCampaignListController(getCampaignListRepository)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()

  return new LogControllerDecorator(getCampaignListController, logErrorRepository)
}

export const makeDeleteCampaignController = (): IController => {
  const deleteCampaignRepository = new DeleteCampaignRepository()
  const deleteCampaignController = new DeleteCampaignController(deleteCampaignRepository)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(deleteCampaignController, logErrorRepository)
}

export const makeDuplicateCampaignController = (): IController => {
  const duplicateCampaignRepository = new DuplicateCampaignRepository()
  const duplicateCampaignController = new DuplicateCampaignController(duplicateCampaignRepository)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(duplicateCampaignController, logErrorRepository)
}

export const makeUpdateCampaignController = (): IController => {
  const updateCampaignRepository = new UpdateCampaignRepository()
  const updateCampaignController = new UpdateCampaignController(updateCampaignRepository)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(updateCampaignController, logErrorRepository)
}
