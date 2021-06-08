import { GetUploadedBases } from '@/data/usecases'
import { GetUploadedBasesSpy } from '../../../../data/mocks/uploaded-bases'
import { datatype, random } from 'faker'

type SutTypes = {
  sut: GetUploadedBases
  getUploadedBasesSpy: GetUploadedBasesSpy
}
const makeSut = (): SutTypes => {
  const getUploadedBasesSpy = new GetUploadedBasesSpy()
  const sut = new GetUploadedBases(getUploadedBasesSpy)
  return { sut, getUploadedBasesSpy }
}
const fakeSchemaName = random.word()
const fakeEnrichment = datatype.boolean()
describe('GetUploadedBases', () => {
  test('should call get with correct values', async () => {
    const { sut, getUploadedBasesSpy } = makeSut()
    await sut.get(fakeSchemaName, fakeEnrichment)
    expect(getUploadedBasesSpy.schemaName).toBe(fakeSchemaName)
    expect(getUploadedBasesSpy.enrichment).toBe(fakeEnrichment)
  })
})
