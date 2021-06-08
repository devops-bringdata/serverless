import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { ChargeCreditsRepository } from '@/infra/db/typeorm/repositories/credits'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { ChargeCreditsController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

export const makeChargeCreditsController = (): IController => {
  const chargeCreditsRepository = new ChargeCreditsRepository()
  const chargeCreditsController = new ChargeCreditsController(chargeCreditsRepository)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(chargeCreditsController, logErrorRepository)
}
