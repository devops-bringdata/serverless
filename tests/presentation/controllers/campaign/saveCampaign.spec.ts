import { CreateCampaignController } from '@/presentation/controllers/campaign/create-campaign'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { datatype } from 'faker'
import { CreateCampaignSpy, mockCampaign } from '../../mocks/campaign'
import { StartEnrichmentSpy } from '../../mocks/enrichment'
import { ValidationSpy } from '../../mocks/validation'

describe('Save Campaign Controller', () => {
  type SutTypes = {
    sut: CreateCampaignController
    validationSpy: ValidationSpy
    createCampaignSpy: CreateCampaignSpy
    startEnrichmentSpy: StartEnrichmentSpy
  }
  const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const createCampaignSpy = new CreateCampaignSpy()
    const startEnrichmentSpy = new StartEnrichmentSpy()
    const sut = new CreateCampaignController(validationSpy, createCampaignSpy, startEnrichmentSpy)
    return { sut, validationSpy, createCampaignSpy, startEnrichmentSpy }
  }
  const fakeCampaign = mockCampaign()
  test('Should call CreateCampaign with correct values', async () => {
    const { sut, createCampaignSpy } = makeSut()
    const requestParams = mockCampaign()
    await sut.handle(requestParams, {
      schemaName: 'bringdatajest',
      uuid: requestParams.owner
    })
    delete requestParams.uuid
    expect(createCampaignSpy.campaign).toEqual(requestParams)
  })

  test('Should return 500 if CreateCampaign throws', async () => {
    const { sut, createCampaignSpy } = makeSut()
    jest.spyOn(createCampaignSpy, 'create').mockImplementationOnce(async () => {
      return new Promise((_resolve, reject) => reject(new Error()))
    })
    const httpRequest = mockCampaign()
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdatajest',
      uuid: 'any_id'
    })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should return 200 even if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = JSON.parse(JSON.stringify(fakeCampaign))
    delete httpRequest.name
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdatajest',
      uuid: 'any_id'
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.name).toBeTruthy()
  })

  test('Should return 200 even if no emailTemplate.buttonLabel is provided', async () => {
    const { sut } = makeSut()
    let httpRequest = JSON.parse(JSON.stringify(fakeCampaign))
    delete httpRequest.emailTemplate.buttonLabel
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdatajest',
      uuid: 'any_id'
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.emailTemplate.buttonLabel).toBeTruthy()
  })
  test('Should call startEnrichment with correct values', async () => {
    const { sut, createCampaignSpy, startEnrichmentSpy } = makeSut()
    let httpRequest = JSON.parse(JSON.stringify(fakeCampaign))
    const fakeGroupId = datatype.uuid()
    httpRequest.mustEnrich = true
    httpRequest.groupId = fakeGroupId
    await sut.handle(httpRequest, {
      schemaName: 'bringdatajest',
      uuid: 'any_id'
    })
    expect(startEnrichmentSpy.campaignId).toBe(createCampaignSpy.result.uuid)
  })

  // test('Should return 200 if valid data is provided', async () => {
  //   const { sut } = makeSut()
  //   const httpRequest = JSON.parse(JSON.stringify(expectedBody))
  //   const httpResponse = await sut.handle(httpRequest, {
  //     schemaName: 'bringdatajest',
  //     uuid: 'any_id'
  //   })
  //   expect(httpResponse.statusCode).toBe(200)
  //   expect(httpResponse.body).toEqual({
  //     uuid: 'valid_id',
  //     name: 'valid_name',
  //     owner: 'any_id',
  //     emailVariable: 'valid_email_variable',
  //     variables: [
  //       {
  //         name: 'valid_variable_name',
  //         question: 'valid_question',
  //         history: false,
  //         variableType: 0,
  //         lgpdJustification: 'any_lgpd_justification'
  //       }
  //     ],
  //     collectWays: ['valid_collect_ways'],
  //     emailTemplate: {
  //       buttonLabel: 'some_string',
  //       fromMail: 'some_string',
  //       fromName: 'some_string',
  //       greeting: 'some_string',
  //       logo: 'some_string',
  //       subject: 'some_string',
  //       text: 'some_string',
  //       title: 'some_string'
  //     }
  //   })
  // })
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = JSON.parse(JSON.stringify(fakeCampaign))
    await sut.handle(httpRequest, {
      schemaName: 'bringdatajest',
      uuid: 'any_id'
    })
    expect(validationSpy.input).toEqual(httpRequest)
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = JSON.parse(JSON.stringify(fakeCampaign))
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdatajest',
      uuid: 'any_id'
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
