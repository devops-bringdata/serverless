import { IChargeCreditsModel } from '@/domain/models/charge/charge-credits'

export interface IChargeCredits {
  charge: (params: IChargeCredits.Params, schemaName: string) => Promise<IChargeCreditsModel>
}

export namespace IChargeCredits {
  export type Params = {
    amount: number
    description?: string
  }
}
