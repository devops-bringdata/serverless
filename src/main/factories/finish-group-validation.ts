import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { ChargeCreditsRepository } from '@/infra/db/typeorm/repositories/credits'
import {
  FindValidationBaseRepository,
  UpdateValidationBaseRepository
} from '@/infra/db/typeorm/repositories/validation-bases'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { FinishGroupValidationController } from '@/presentation/controllers'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

export const makeFinishGroupValidationController = (): IController => {
  const findValidationBaseRepository = new FindValidationBaseRepository()
  const updateValidationBaseRepository = new UpdateValidationBaseRepository()
  const chargeCreditsRepository = new ChargeCreditsRepository()
  const finishGroupValidationController = new FinishGroupValidationController(
    findValidationBaseRepository,
    updateValidationBaseRepository,
    chargeCreditsRepository
  )
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(finishGroupValidationController, logErrorRepository)
}
