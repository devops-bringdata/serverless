import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'
import { time, lorem, random } from 'faker'

export const mockValidationBase = (): IValidationBaseModel => {
  return {
    uuid: random.uuid(),
    name: lorem.word(),
    addresses: {
      chargedQuantity: random.number(),
      quantity: random.number(),
      finished: random.boolean(),
      externalValidationId: random.uuid()
    },
    emails: {
      chargedQuantity: random.number(),
      quantity: random.number(),
      finished: random.boolean(),
      externalValidationId: random.uuid()
    },
    phones: {
      chargedQuantity: random.number(),
      quantity: random.number(),
      finished: random.boolean(),
      externalValidationId: random.uuid()
    },
    finished: random.boolean(),
    storeName: time.recent().toString(),
    userId: random.uuid()
  }
}
export const mockRefundValidationBase = (): IValidationBaseModel => {
  const chargedQuantity = random.number()
  const quantity = chargedQuantity + random.number()
  return {
    uuid: random.uuid(),
    name: lorem.word(),
    addresses: {
      chargedQuantity,
      quantity,
      finished: random.boolean(),
      externalValidationId: random.uuid()
    },
    emails: {
      chargedQuantity,
      quantity,
      finished: random.boolean(),
      externalValidationId: random.uuid()
    },
    phones: {
      chargedQuantity,
      quantity,
      finished: random.boolean(),
      externalValidationId: random.uuid()
    },
    finished: random.boolean(),
    storeName: time.recent().toString(),
    userId: random.uuid()
  }
}
