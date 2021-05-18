import { ITenant } from '@/domain/models/tenant'
import { StartEnrichmentController } from '@/presentation/controllers/enrichment/start-enrichment'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { random, time } from 'faker'
import { StartEnrichmentSpy } from '../../mocks/enrichment'

type SutTypes = {
  startEnrichmentSpy: StartEnrichmentSpy
  sut: StartEnrichmentController
}
const makeSut = (): SutTypes => {
  const startEnrichmentSpy = new StartEnrichmentSpy()
  const sut = new StartEnrichmentController(startEnrichmentSpy)
  return {
    startEnrichmentSpy,
    sut
  }
}
const mockRequest = (): StartEnrichmentController.Request => {
  return {
    campaignId: random.uuid(),
    groupId: time.recent().toString()
  }
}
const mockTenant = (): ITenant => {
  return {
    uuid: random.uuid(),
    schemaName: 'bringdatajest'
  }
}
describe('StartEnrichmentController', () => {
  test('should return 400 if no campaignId is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    delete request.campaignId
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('campaignId')))
  })
  test('should return 400 if no groupId is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    delete request.groupId
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('groupId')))
  })
  test('should call startEnrichment with correct values', async () => {
    const { sut, startEnrichmentSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request, mockTenant())
    expect(startEnrichmentSpy.campaignId).toBe(request.campaignId)
    expect(startEnrichmentSpy.groupId).toBe(request.groupId)
  })
})
