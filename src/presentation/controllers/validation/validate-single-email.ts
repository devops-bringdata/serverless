import { IValidateEmail } from '@/data/protocols/validation/email'
import { ITenant } from '@/domain/models/tenant'
import { ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class ValidateSingleEmailController implements IController {
  constructor(private readonly validateEmail: IValidateEmail) {}
  async handle(request: any, _tenant?: ITenant): Promise<IHttpResponse> {
    const validation = await this.validateEmail.validate(request.email)
    return ok(validation)
  }
}
