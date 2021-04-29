import { ChargeCreditsController } from '@/presentation/controllers/charge/charge-credits'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { ChargeSpy } from '../mocks/mock-charge'

type SutTypes = {
  sut: ChargeCreditsController
  chargeSpy: ChargeSpy
}
const makeSut = (): SutTypes => {
  const chargeSpy = new ChargeSpy()
  const sut = new ChargeCreditsController(chargeSpy)
  return {
    chargeSpy,
    sut
  }
}
describe('ChargeCreditsController', () => {
  test('Should return 400 if no amount is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ amount: null })
    expect(response).toEqual(badRequest(new MissingParamError('amount')))
  })

  test('Should call charge with correct values', async () => {
    const { sut, chargeSpy } = makeSut()
    await sut.handle(
      { amount: 10, description: 'enrichment' },
      {
        uuid: 'any_id',
        schemaName: 'any_schemaName'
      }
    )
    expect(chargeSpy.params).toEqual({ amount: 10, description: 'enrichment' })
  })
})
