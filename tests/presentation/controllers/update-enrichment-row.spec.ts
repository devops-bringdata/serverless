// import { ChargeCreditsRepository } from "@/infra/db/typeorm/repositories/credits-repository/charge-credits"
import { UpdateEnrichmentRowController } from '@/presentation/controllers/enrichment/update-enrichment-row'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { DecrypterSpy } from '../../data/mocks/mock-cryptography'
import { random } from 'faker'
import { GetEnrichmentRowSpy, UpdateUploadedDataSpy } from '../../data/mocks/mock-enrichment'
import { mockEnrichmentRow } from '../../domain/mocks/enrichment'
import { mockUploadedDataModel } from '../../domain/mocks/uploaded-data'
import { ChargeCreditsSpy } from '../../data/mocks/credits'
import { FindUploadedBaseSpy, UpdateUploadedBaseSpy } from '../mocks/uploaded-base'

type SutTypes = {
  sut: UpdateEnrichmentRowController
  decrypterSpy: DecrypterSpy
  getEnrichmentRowSpy: GetEnrichmentRowSpy
  updateUploadedDataSpy: UpdateUploadedDataSpy
  chargeCreditsSpy: ChargeCreditsSpy
  findUploadedBaseSpy: FindUploadedBaseSpy
  updateUploadedBaseSpy: UpdateUploadedBaseSpy
}
const makeSut = (): SutTypes => {
  const updateUploadedDataSpy = new UpdateUploadedDataSpy()
  const decrypterSpy = new DecrypterSpy()
  const getEnrichmentRowSpy = new GetEnrichmentRowSpy()
  const chargeCreditsSpy = new ChargeCreditsSpy()
  const findUploadedBaseSpy = new FindUploadedBaseSpy()
  const updateUploadedBaseSpy = new UpdateUploadedBaseSpy()
  const sut = new UpdateEnrichmentRowController(
    updateUploadedDataSpy,
    decrypterSpy,
    getEnrichmentRowSpy,
    chargeCreditsSpy,
    findUploadedBaseSpy,
    updateUploadedBaseSpy
  )
  return {
    sut,
    decrypterSpy,
    getEnrichmentRowSpy,
    updateUploadedDataSpy,
    chargeCreditsSpy,
    findUploadedBaseSpy,
    updateUploadedBaseSpy
  }
}
let rowArray = []
for (let i = 0; i < random.number(5); i++) {
  rowArray.push(mockEnrichmentRow())
}
const mockRequest = {
  row: rowArray,
  token: random.alphaNumeric()
}
const mockDecryptResponse = {
  uuid: random.uuid(),
  schemaName: random.word()
}
describe('UpdateEnrichmentRowController', () => {
  test('should return 400 if no row is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      row: null,
      token: random.alphaNumeric()
    })
    expect(response).toEqual(badRequest(new MissingParamError('row')))
  })
  test('should return 400 if no token is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      row: [mockEnrichmentRow()],
      token: null
    })
    expect(response).toEqual(badRequest(new MissingParamError('token')))
  })
  test('should call decrypt with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    const mockResponse = {
      row: [mockEnrichmentRow()],
      token: random.alphaNumeric()
    }
    await sut.handle(mockResponse)
    expect(decrypterSpy.encryptedText).toBe(mockResponse.token)
  })
  test('should call getEnrichmentRowRepository.get with correct values', async () => {
    const { sut, decrypterSpy, getEnrichmentRowSpy } = makeSut()
    const mockResponse = {
      row: [mockEnrichmentRow()],
      token: random.alphaNumeric()
    }
    const mockDecryptResponse = {
      uuid: random.uuid(),
      schemaName: random.word()
    }
    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(mockDecryptResponse)
      })
    )
    await sut.handle(mockResponse)
    expect(getEnrichmentRowSpy.uuid).toBe(mockDecryptResponse.uuid)
    expect(getEnrichmentRowSpy.schemaName).toBe(mockDecryptResponse.schemaName)
  })
  test('should call updateUploadedData.update with correct values', async () => {
    const { sut, getEnrichmentRowSpy, decrypterSpy, updateUploadedDataSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(mockDecryptResponse)
      })
    )
    const enrichmentRow = mockUploadedDataModel()
    jest.spyOn(getEnrichmentRowSpy, 'get').mockReturnValueOnce(new Promise((resolve) => resolve(enrichmentRow)))
    await sut.handle(mockRequest)
    expect(updateUploadedDataSpy.rowId).toBe(mockDecryptResponse.uuid)
  })
  test('should call charge with correct values', async () => {
    const { sut, getEnrichmentRowSpy, decrypterSpy, chargeCreditsSpy } = makeSut()

    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(mockDecryptResponse)
      })
    )
    const enrichmentRow = mockUploadedDataModel()
    enrichmentRow.row_enrichment = JSON.parse(JSON.stringify(rowArray))
    if (!enrichmentRow?.row_enrichment[0]?.result) enrichmentRow.row_enrichment[0].result = ''
    enrichmentRow.row_enrichment[0].result = ''
    let chargeCount = 0
    rowArray.map((column) => {
      const founded = enrichmentRow.row_enrichment.find((x) => x.header === column.header)
      if (founded && founded.result !== column.result) chargeCount++
    })
    jest.spyOn(getEnrichmentRowSpy, 'get').mockReturnValueOnce(new Promise((resolve) => resolve(enrichmentRow)))
    await sut.handle(mockRequest)
    expect(chargeCreditsSpy.amount).toBe(chargeCount)
  })

  test('should call findUploadedBase with correct values', async () => {
    const { sut, getEnrichmentRowSpy, decrypterSpy, findUploadedBaseSpy } = makeSut()

    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(mockDecryptResponse)
      })
    )
    const enrichmentRow = mockUploadedDataModel()
    enrichmentRow.row_enrichment = JSON.parse(JSON.stringify(rowArray))
    if (!enrichmentRow.row_enrichment[0].result) enrichmentRow.row_enrichment[0].result = ''
    enrichmentRow.row_enrichment[0].result = ''
    jest.spyOn(getEnrichmentRowSpy, 'get').mockReturnValueOnce(new Promise((resolve) => resolve(enrichmentRow)))
    await sut.handle(mockRequest)
    expect(findUploadedBaseSpy.group).toBe(enrichmentRow.uploadedDataGroup)
  })

  test('should call updateUploadedBase.update with correct values', async () => {
    const { sut, getEnrichmentRowSpy, decrypterSpy, findUploadedBaseSpy, updateUploadedBaseSpy } = makeSut()

    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(mockDecryptResponse)
      })
    )
    const enrichmentRow = mockUploadedDataModel()
    enrichmentRow.row_enrichment = JSON.parse(JSON.stringify(rowArray))
    if (!enrichmentRow.row_enrichment[0].result) {
      enrichmentRow.row_enrichment[0].result = ''
    }
    enrichmentRow.row_enrichment[0].result = ''
    let chargeCount = 0
    rowArray.map((column) => {
      const founded = enrichmentRow.row_enrichment.find((x) => x.header === column.header)
      if (founded && founded.result !== column.result) chargeCount++
    })
    jest.spyOn(getEnrichmentRowSpy, 'get').mockReturnValueOnce(new Promise((resolve) => resolve(enrichmentRow)))
    findUploadedBaseSpy.result.collectedDataQuantity += chargeCount
    await sut.handle(mockRequest)
    expect(updateUploadedBaseSpy.uploadedBase.campaign).toEqual(findUploadedBaseSpy.result.campaign)
    expect(updateUploadedBaseSpy.uploadedBase.collectedDataQuantity).toEqual(
      findUploadedBaseSpy.result.collectedDataQuantity + 1
    )
    expect(updateUploadedBaseSpy.uploadedBase.fileName).toEqual(findUploadedBaseSpy.result.fileName)
    expect(updateUploadedBaseSpy.uploadedBase.group).toEqual(findUploadedBaseSpy.result.group)
    expect(updateUploadedBaseSpy.uploadedBase.mustEnrich).toEqual(findUploadedBaseSpy.result.mustEnrich)
    expect(updateUploadedBaseSpy.uploadedBase.validated).toEqual(findUploadedBaseSpy.result.validated)
  })
})
