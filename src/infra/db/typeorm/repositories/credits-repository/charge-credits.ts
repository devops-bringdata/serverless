import { IChargeCreditsModel } from '@/domain/models/charge/charge-credits'
import { IChargeCredits } from '@/domain/usecases/charge/charge-credits'
import { v4 } from 'uuid'
import { Credit } from '../../entities/Credits'
import { connect } from '../../helpers/connection'

export class ChargeCreditsRepository implements IChargeCredits {
  async charge(params: IChargeCredits.Params, schemaName: string): Promise<IChargeCreditsModel> {
    const creditRepository = (await connect(schemaName)).manager.getRepository(Credit)
    const lastCredit = await creditRepository
      .find({
        order: { id: 'DESC' }
      })
      .then((data) => data[0])
    let newCreditObject: IChargeCreditsModel = {
      uuid: v4(),
      id: lastCredit.id + 1,
      totalAfterOperation: lastCredit.totalAfterOperation - params.amount,
      operationAmount: -params.amount,
      description: params.description
    }
    return await creditRepository.save(newCreditObject)
  }
}
