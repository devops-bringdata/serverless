import { DbFindUploadedDataByGroupId } from '@/data/usecases'
import { FindUploadedDataByGroupIdSpy } from '../mocks'

type SutTypes = {
  sut: DbFindUploadedDataByGroupId
  findUploadedDataByGroupIdSpy: FindUploadedDataByGroupIdSpy
}
const makeSut = (): SutTypes => {
  const findUploadedDataByGroupIdSpy = new FindUploadedDataByGroupIdSpy()
  const sut = new DbFindUploadedDataByGroupId(findUploadedDataByGroupIdSpy)
  return { sut, findUploadedDataByGroupIdSpy }
}
describe('DbFindUploadedDataByGroupId', () => {
  test('should call findRows with correct values', async () => {
    const { sut, findUploadedDataByGroupIdSpy } = makeSut()
    await sut.findRows('any_group_id', 'any_schema_name')
    expect(findUploadedDataByGroupIdSpy.groupId).toBe('any_group_id')
    expect(findUploadedDataByGroupIdSpy.schemaName).toBe('any_schema_name')
  })
})
