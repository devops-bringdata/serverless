import { DownloadEnrichedBaseController } from '@/presentation/controllers/enrichment/download-enriched-base'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController } from '@/presentation/protocols'
import { FindUploadedDataByGroupIdSpy } from '../../../data/mocks/uploaded-data'
type SutTypes = {
  findUploadedDataByGroupIdSpy: FindUploadedDataByGroupIdSpy
  sut: IController
}
const makeSut = (): SutTypes => {
  const findUploadedDataByGroupIdSpy = new FindUploadedDataByGroupIdSpy()
  const sut: IController = new DownloadEnrichedBaseController(findUploadedDataByGroupIdSpy)
  return {
    findUploadedDataByGroupIdSpy,
    sut
  }
}
describe('DownloadEnrichedBaseController', () => {
  test('should return 400 if no groupId is provided', async () => {
    const { sut } = makeSut()
    const request = await sut.handle(
      { groupId: null },
      {
        uuid: 'any_id',
        schemaName: 'any_schemaName'
      }
    )
    expect(request).toEqual(badRequest(new MissingParamError('groupId')))
  })
  test('should call findRows with correct values', async () => {
    const { sut, findUploadedDataByGroupIdSpy } = makeSut()
    await sut.handle(
      { groupId: 'any_groupId' },
      {
        uuid: 'any_id',
        schemaName: 'any_schemaName'
      }
    )
    expect(findUploadedDataByGroupIdSpy.groupId).toBe('any_groupId')
    expect(findUploadedDataByGroupIdSpy.schemaName).toBe('any_schemaName')
  })
  test('should return 200 if not find rows', async () => {
    const { sut, findUploadedDataByGroupIdSpy } = makeSut()
    jest.spyOn(findUploadedDataByGroupIdSpy, 'findRows').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve([]))
    })
    const request = await sut.handle(
      { groupId: 'any_groupId' },
      {
        uuid: 'any_id',
        schemaName: 'any_schemaName'
      }
    )
    expect(request.statusCode).toBe(200)
    expect(request).toEqual(ok([]))
  })
})
