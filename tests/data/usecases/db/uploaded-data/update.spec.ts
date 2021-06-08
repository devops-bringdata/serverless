import { DbUpdateUploadedData } from '@/data/usecases'
import { makeUploadedDataRow, UpdateUploadedDataSpy } from '../../../../data/mocks/uploaded-data'
import { datatype, random } from 'faker'

type SutTypes = {
  sut: DbUpdateUploadedData
  updateUploadedDataSpy: UpdateUploadedDataSpy
}
const makeSut = (): SutTypes => {
  const updateUploadedDataSpy = new UpdateUploadedDataSpy()
  const sut = new DbUpdateUploadedData(updateUploadedDataSpy)
  return { sut, updateUploadedDataSpy }
}
const fakeRowId = datatype.uuid()
const fakeUploadedDataRow = makeUploadedDataRow()
const fakeSchemaName = random.word()
describe('GetOrganizationByApiKey', () => {
  test('should call get with correct values', async () => {
    const { sut, updateUploadedDataSpy } = makeSut()
    await sut.update(fakeRowId, fakeUploadedDataRow, fakeSchemaName)
    expect(updateUploadedDataSpy.rowId).toBe(fakeRowId)
    expect(updateUploadedDataSpy.uploadedDataRow).toEqual(fakeUploadedDataRow)
    expect(updateUploadedDataSpy.schemaName).toBe(fakeSchemaName)
  })
})
