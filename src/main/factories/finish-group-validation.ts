import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { LogControllerDecorator } from '../decorators'
import { IController } from '@/presentation/protocols'
import { FinishGroupValidationController } from '@/presentation/controllers/validation/finish-group-validation'
import { FindValidationBaseRepository } from '@/infra/db/typeorm/repositories/validation-bases/find-validation-base'
import { UpdateValidationBaseRepository } from '@/infra/db/typeorm/repositories/validation-bases/update-validation-base'
import { ChargeCreditsRepository } from '@/infra/db/typeorm/repositories/credits-repository/charge-credits'

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
