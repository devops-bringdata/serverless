import { ITenant } from '@/domain/models/tenant'
import { IChargeCredits } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class ChargeCreditsController implements IController {
  constructor(private chargeCreditsRepository: IChargeCredits) {}
  async handle(request: ChargeController.Request, tenant?: ITenant): Promise<IHttpResponse> {
    if (!request.amount) return badRequest(new MissingParamError('amount'))
    let charge = await this.chargeCreditsRepository.charge(
      { amount: request.amount, description: request.description },
      tenant.schemaName
    )
    return ok(charge)
  }
}
export namespace ChargeController {
  export type Request = {
    amount: number
    description?: string
  }
}
