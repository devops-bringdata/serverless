import { FinishGroupValidationController } from '@/presentation/controllers/validation/finish-group-validation'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController } from '@/presentation/protocols'
import { mockRefundValidationBase, mockValidationBase } from '../../domain/mocks/validation-base-results'
import { ChargeSpy } from '../mocks/mock-charge'
import { mockTenant } from '../mocks/mock-tenant'
import { FindValidationBaseSpy, UpdateValidationBaseSpy } from '../mocks/mock-validation-base'

type SutTypes = {
  sut: IController
  findValidationBaseSpy: FindValidationBaseSpy
  updateValidationBaseSpy: UpdateValidationBaseSpy
  chargeSpy: ChargeSpy
}
const makeSut = (): SutTypes => {
  const updateValidationBaseSpy = new UpdateValidationBaseSpy()
  const findValidationBaseSpy = new FindValidationBaseSpy()
  const chargeSpy = new ChargeSpy()
  const sut: IController = new FinishGroupValidationController(
    findValidationBaseSpy,
    updateValidationBaseSpy,
    chargeSpy
  )
  return {
    sut,
    findValidationBaseSpy,
    updateValidationBaseSpy,
    chargeSpy
  }
}
describe('FinishGroupValidationController', () => {
  test('should return 400 if no validationGroup is provided', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({})
    expect(result).toEqual(badRequest(new MissingParamError('validationGroup')))
  })

  test('should call validation base repository find with correct values', async () => {
    const { sut, findValidationBaseSpy } = makeSut()
    await sut.handle({ validationGroup: 'any_validation_group' }, mockTenant())
    expect(findValidationBaseSpy.params).toEqual({
      validationGroup: 'any_validation_group'
    })
  })

  test("should return 200 if emails, phones and adresses aren't finished", async () => {
    const { sut, findValidationBaseSpy } = makeSut()
    const mock = mockValidationBase()
    mock.addresses.finished = false
    jest.spyOn(findValidationBaseSpy, 'find').mockReturnValueOnce(new Promise((resolve) => resolve(mock)))
    const response = await sut.handle({ validationGroup: 'any_validation_group' }, mockTenant())
    expect(response).toEqual(ok({}))
  })

  test('should call validation base repository update with correct values', async () => {
    const { sut, findValidationBaseSpy, updateValidationBaseSpy } = makeSut()
    const mock = mockValidationBase()
    mock.emails.finished = true
    mock.addresses.finished = true
    mock.phones.finished = true
    jest.spyOn(findValidationBaseSpy, 'find').mockReturnValueOnce(new Promise((resolve) => resolve(mock)))
    await sut.handle({ validationGroup: 'any_validation_group' }, mockTenant())
    expect(updateValidationBaseSpy.params).toEqual(mock)
  })

  test('should call charge with correct values', async () => {
    const { sut, findValidationBaseSpy, chargeSpy } = makeSut()
    const mock = mockRefundValidationBase()
    mock.emails.finished = true
    mock.addresses.finished = true
    mock.phones.finished = true
    jest.spyOn(findValidationBaseSpy, 'find').mockReturnValueOnce(new Promise((resolve) => resolve(mock)))
    await sut.handle({ validationGroup: 'any_validation_group' }, mockTenant())
    const amount = mock.emails.quantity + mock.phones.quantity + mock.addresses.quantity

    const chargedAmount = mock.emails.chargedQuantity + mock.phones.chargedQuantity + mock.addresses.chargedQuantity
    const response = {
      amount: chargedAmount - amount,
      description: 'refund'
    }
    expect(chargeSpy.params).toEqual(response)
  })
})
