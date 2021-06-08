import { DbGetEnrichmentRow } from '@/data/usecases'
import { GetEnrichmentRowSpy } from '../../../../data/mocks'
import { datatype, name } from 'faker'

type SutTypes = {
  sut: DbGetEnrichmentRow
  getEnrichmentRowSpy: GetEnrichmentRowSpy
}
const makeSut = (): SutTypes => {
  const getEnrichmentRowSpy = new GetEnrichmentRowSpy()
  const sut = new DbGetEnrichmentRow(getEnrichmentRowSpy)
  return { sut, getEnrichmentRowSpy }
}
const fakeUuid = datatype.uuid()
const fakeSchemaName = name.title()
describe('DbGetEnrichmentRow', () => {
  test('should call get with correct values', async () => {
    const { sut, getEnrichmentRowSpy } = makeSut()

    await sut.get(fakeUuid, fakeSchemaName)
    expect(getEnrichmentRowSpy.uuid).toEqual(fakeUuid)
    expect(getEnrichmentRowSpy.schemaName).toEqual(fakeSchemaName)
  })
})
