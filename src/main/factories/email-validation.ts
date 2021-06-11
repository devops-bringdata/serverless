import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { ValidateEmail } from '@/data/usecases/validation/email'
import { LogLogDnaRepository } from '@/infra/log/logdna-repository/log'
import { ValidateSingleEmailController } from '@/presentation/controllers/validation/validate-single-email'
import { IController } from '@/presentation/protocols'
import { LogControllerDecorator } from '../decorators'

export const makeGetValidateSingleEmailController = (): IController => {
  const emailValidationAdapter = new ValidateEmail()
  const validateSingleEmailControler = new ValidateSingleEmailController(emailValidationAdapter)
  let logErrorRepository: ILogErrorRepository = new LogLogDnaRepository()
  return new LogControllerDecorator(validateSingleEmailControler, logErrorRepository)
}
