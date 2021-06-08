import { EnrichRow } from '@/data/usecases'
import { ServerError } from '@/presentation/errors'
import { serverError } from '@/presentation/helpers'
import { mockUploadedDataModel } from '../../../../domain/mocks/uploaded-data'
import { mockCampaignModel } from '../../../../domain/mocks'
import { EncrypterSpy } from '../../../../infra/mocks/encrypter'
import { EmailSenderSpy } from '../../../mocks/email-sender'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { UpdateUploadedDataSpy } from '../../../../data/mocks/uploaded-data'

type SutTypes = {
  emailSenderSpy: EmailSenderSpy
  updateUploadedDataSpy: UpdateUploadedDataSpy
  encrypterSpy: EncrypterSpy
  sut: EnrichRow
}
const makeSut = (): SutTypes => {
  const emailSenderSpy = new EmailSenderSpy()
  const updateUploadedDataSpy = new UpdateUploadedDataSpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new EnrichRow(emailSenderSpy, updateUploadedDataSpy, encrypterSpy)
  return {
    sut,
    emailSenderSpy,
    updateUploadedDataSpy,
    encrypterSpy
  }
}
const campaignModel = mockCampaignModel()
const uploadedDataModel = mockUploadedDataModel()
describe('EnrichRow', () => {
  test('should return Server Error if no row was found', async () => {
    const { sut } = makeSut()
    const response = await sut.enrich(null, campaignModel, 'bringdatajest')
    expect(response).toEqual(serverError(new ServerError('Row Content was not founded')))
  })
  test('should return Server Error if no campaign was found', async () => {
    const { sut } = makeSut()
    const response = await sut.enrich(uploadedDataModel, null, 'bringdatajest')
    expect(response).toEqual(serverError(new ServerError('Row Content was not founded')))
  })
  test('should return Server Error if no row content was found', async () => {
    const { sut } = makeSut()
    const noRowContent = JSON.parse(JSON.stringify(uploadedDataModel))
    delete noRowContent.row_content
    const response = await sut.enrich(noRowContent, campaignModel, 'bringdatajest')
    expect(response).toEqual(serverError(new ServerError('Row Content was not founded')))
  })
  test('should return null if email does not match header', async () => {
    const { sut } = makeSut()
    const response = await sut.enrich(uploadedDataModel, campaignModel, 'bringdatajest')
    expect(response).toBe(null)
  })
  test('should call update with correct values if variableType = 1', async () => {
    const { sut, updateUploadedDataSpy } = makeSut()
    const matchedUploadedData: IUploadedDataModel = JSON.parse(JSON.stringify(uploadedDataModel))
    const matchedCampaign: ICampaignModel = JSON.parse(JSON.stringify(campaignModel))
    matchedCampaign.emailVariable = matchedUploadedData.row_content[0].header
    matchedCampaign.variables[0].name = matchedUploadedData.row_content[0].header
    matchedCampaign.variables[0].variableType = 1

    await sut.enrich(matchedUploadedData, matchedCampaign, 'bringdatajest')
    expect(updateUploadedDataSpy.rowId).toBe(matchedUploadedData.uuid)
    expect(updateUploadedDataSpy.uploadedDataRow).toEqual(matchedUploadedData)
    expect(updateUploadedDataSpy.schemaName).toEqual('bringdatajest')
  })
  test('should call update with correct values if variableType = 1', async () => {
    const { sut, updateUploadedDataSpy } = makeSut()
    const matchedUploadedData: IUploadedDataModel = JSON.parse(JSON.stringify(uploadedDataModel))
    const matchedCampaign: ICampaignModel = JSON.parse(JSON.stringify(campaignModel))
    matchedUploadedData.row_content.push(mockUploadedDataModel().row_content[0])
    matchedUploadedData.row_content[1].value = ''
    matchedCampaign.emailVariable = matchedUploadedData.row_content[0].header
    matchedCampaign.variables[0].name = matchedUploadedData.row_content[1].header
    matchedCampaign.variables[0].variableType = 0

    await sut.enrich(matchedUploadedData, matchedCampaign, 'bringdatajest')
    expect(updateUploadedDataSpy.rowId).toBe(matchedUploadedData.uuid)
    expect(updateUploadedDataSpy.uploadedDataRow).toEqual(matchedUploadedData)
    expect(updateUploadedDataSpy.schemaName).toEqual('bringdatajest')
  })
})
