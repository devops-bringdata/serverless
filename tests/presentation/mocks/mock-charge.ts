import { IChargeCreditsModel } from '@/domain/models/charge/charge-credits'
import { IChargeCredits } from '@/domain/usecases/charge/charge-credits'
import { datatype, lorem } from 'faker'

export class ChargeSpy implements IChargeCredits {
  params: IChargeCredits.Params
  result: IChargeCreditsModel = {
    uuid: datatype.uuid(),
    id: datatype.number(),
    totalAfterOperation: datatype.number(),
    operationAmount: datatype.number(),
    description: lorem.paragraph(3)
  }
  async charge(params: IChargeCredits.Params, _schemaName: string): Promise<IChargeCreditsModel> {
    this.params = params
    return this.result
  }
}
