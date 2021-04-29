import { IChargeCreditsModel } from '@/domain/models/charge/charge-credits'
import { IChargeCredits } from '@/domain/usecases/charge/charge-credits'

export class ChargeCreditsSpy implements IChargeCredits {
  amount: number
  schemaName: string
  async charge(params: IChargeCredits.Params, schemaName: string): Promise<IChargeCreditsModel> {
    this.amount = params.amount
    this.schemaName = schemaName
    return
  }
}
