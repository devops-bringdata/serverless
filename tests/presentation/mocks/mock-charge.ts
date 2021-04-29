import { IChargeCreditsModel } from '@/domain/models/charge/charge-credits'
import { IChargeCredits } from '@/domain/usecases/charge/charge-credits'
import { lorem, random } from 'faker'

export class ChargeSpy implements IChargeCredits {
  params: IChargeCredits.Params
  result: IChargeCreditsModel = {
    uuid: random.uuid(),
    id: random.number(),
    totalAfterOperation: random.number(),
    operationAmount: random.number(),
    description: lorem.paragraph(3)
  }
  async charge(params: IChargeCredits.Params, _schemaName: string): Promise<IChargeCreditsModel> {
    this.params = params
    return this.result
  }
}
