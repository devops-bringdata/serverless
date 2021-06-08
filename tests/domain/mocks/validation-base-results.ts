import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'
import { time, lorem, datatype } from 'faker'

export const mockValidationBase = (): IValidationBaseModel => {
  return {
    uuid: datatype.uuid(),
    name: lorem.word(),
    addresses: {
      chargedQuantity: datatype.number(),
      quantity: datatype.number(),
      finished: datatype.boolean(),
      externalValidationId: datatype.uuid()
    },
    emails: {
      chargedQuantity: datatype.number(),
      quantity: datatype.number(),
      finished: datatype.boolean(),
      externalValidationId: datatype.uuid()
    },
    phones: {
      chargedQuantity: datatype.number(),
      quantity: datatype.number(),
      finished: datatype.boolean(),
      externalValidationId: datatype.uuid()
    },
    finished: datatype.boolean(),
    storeName: time.recent().toString(),
    userId: datatype.uuid()
  }
}
export const mockRefundValidationBase = (): IValidationBaseModel => {
  const chargedQuantity = datatype.number()
  const quantity = chargedQuantity + datatype.number()
  return {
    uuid: datatype.uuid(),
    name: lorem.word(),
    addresses: {
      chargedQuantity,
      quantity,
      finished: datatype.boolean(),
      externalValidationId: datatype.uuid()
    },
    emails: {
      chargedQuantity,
      quantity,
      finished: datatype.boolean(),
      externalValidationId: datatype.uuid()
    },
    phones: {
      chargedQuantity,
      quantity,
      finished: datatype.boolean(),
      externalValidationId: datatype.uuid()
    },
    finished: datatype.boolean(),
    storeName: time.recent().toString(),
    userId: datatype.uuid()
  }
}
