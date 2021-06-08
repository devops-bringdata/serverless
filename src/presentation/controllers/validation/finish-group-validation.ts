import { ITenant } from '@/domain/models/tenant'
import { IFindValidationBase, IUpdateValidationBase, IChargeCredits } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class FinishGroupValidationController implements IController {
  constructor(
    private findValidationBaseRepository: IFindValidationBase,
    private updateValidationBase: IUpdateValidationBase,
    private chargeCreditsRepository: IChargeCredits
  ) {}
  async handle(request: FinishGroupValidationController.Params, tenant: ITenant): Promise<IHttpResponse> {
    if (!request.validationGroup) return badRequest(new MissingParamError('validationGroup'))
    const validationBase = await this.findValidationBaseRepository.find(tenant.schemaName, request)
    if (!validationBase.emails.finished || !validationBase.phones.finished || !validationBase.addresses.finished)
      return ok({})
    else {
      validationBase.finished = true
      await this.updateValidationBase.update(tenant.schemaName, validationBase)
      const chargedCredits =
        validationBase.emails.quantity + validationBase.phones.quantity + validationBase.addresses.quantity
      const chargeCount =
        validationBase.emails.chargedQuantity +
        validationBase.phones.chargedQuantity +
        validationBase.addresses.chargedQuantity
      const creditsBack = chargedCredits - chargeCount
      if (creditsBack > 0) {
        await this.chargeCreditsRepository.charge({ amount: -creditsBack, description: 'refund' }, tenant.schemaName)
      }
      return ok({})
    }
  }
}
export namespace FinishGroupValidationController {
  export type Params = {
    validationGroup: string
  }
}
