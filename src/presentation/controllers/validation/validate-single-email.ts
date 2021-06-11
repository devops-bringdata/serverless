import { IValidateEmail } from '@/data/protocols/validation/email'
import { ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class ValidateSingleEmailController implements IController {
  constructor(private readonly validateEmail: IValidateEmail, private readonly validateExternally: boolean) {}
  async handle(request: any): Promise<IHttpResponse> {
    const validation = await this.validateEmail.validate(request.email, this.validateExternally, request.timeout || 10)
    return ok(validation)
  }
}
