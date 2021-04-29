import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICreateCampaign } from '@/domain/usecases/campaign/create-campaign'
import { CampaignController } from '@/presentation/controllers/campaign/campaign'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { IStartEnrichment } from '@/domain/usecases/enrichment/start-enrichment'
import { IValidation } from '@/presentation/helpers/validators/validation'

describe('Save Campaign Controller', () => {
  const expectedBody = {
    name: 'valid_name',
    owner: 'any_id',
    emailVariable: 'valid_email_variable',
    variables: [
      {
        name: 'valid_variable_name',
        question: 'valid_question',
        history: false,
        variableType: 0,
        lgpdJustification: 'any_lgpd_justification'
      }
    ],
    collectWays: ['valid_collect_ways'],
    emailTemplate: {
      buttonLabel: 'some_string',
      fromMail: 'some_string',
      fromName: 'some_string',
      greeting: 'some_string',
      logo: 'some_string',
      subject: 'some_string',
      text: 'some_string',
      title: 'some_string'
    },
    resendDate: 'optional date to resend the campaign',
    groupId: 'any_group_id',
    mustEnrich: true
  }

  type SutTypes = {
    sut: CampaignController
    createCampaignStub: ICreateCampaign
    startEnrichment: IStartEnrichment
    validationStub: IValidation
  }
  const makeSut = (): SutTypes => {
    const createCampaignStub = makeCreateCampaign()
    const startEnrichment = makeStartEnrichment()
    const validationStub = makeValidation()
    const sut = new CampaignController(validationStub, createCampaignStub, startEnrichment)
    return { sut, createCampaignStub, startEnrichment, validationStub }
  }
  const makeValidation = (): IValidation => {
    class ValidationStub implements IValidation {
      validate(_input: any): Error {
        return null
      }
    }
    return new ValidationStub()
  }
  const makeCreateCampaign = (): ICreateCampaign => {
    class CreateCampaignStub implements ICreateCampaign {
      async create(_campaign: ICreateCampaign.Params): Promise<ICampaignModel> {
        const fakeCampaign = {
          uuid: 'valid_id',
          name: 'valid_name',
          owner: 'any_id',
          emailVariable: 'valid_email_variable',
          variables: [
            {
              name: 'valid_variable_name',
              question: 'valid_question',
              history: false,
              variableType: 0,
              lgpdJustification: 'any_lgpd_justification'
            }
          ],
          collectWays: ['valid_collect_ways'],
          emailTemplate: {
            buttonLabel: 'some_string',
            fromMail: 'some_string',
            fromName: 'some_string',
            greeting: 'some_string',
            logo: 'some_string',
            subject: 'some_string',
            text: 'some_string',
            title: 'some_string'
          }
        }
        return new Promise((resolve) => resolve(fakeCampaign))
      }
    }
    return new CreateCampaignStub()
  }
  const makeStartEnrichment = (): IStartEnrichment => {
    class StartEnrichmentStub implements IStartEnrichment {
      start(_campaignId: string, _groupId: string, _schemaName: string): Promise<any> {
        return
      }
    }
    return new StartEnrichmentStub()
  }

  test('Should call CreateCampaign with correct values', () => {
    const { sut, createCampaignStub } = makeSut()
    const createSpy = jest.spyOn(createCampaignStub, 'create')
    let httpRequest = JSON.parse(JSON.stringify(expectedBody))
    sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(createSpy).toHaveBeenCalledWith(
      {
        name: 'valid_name',
        owner: 'any_id',
        emailVariable: 'valid_email_variable',
        variables: [
          {
            name: 'valid_variable_name',
            question: 'valid_question',
            history: false,
            variableType: 0,
            lgpdJustification: 'any_lgpd_justification'
          }
        ],
        collectWays: ['valid_collect_ways'],
        emailTemplate: {
          buttonLabel: 'some_string',
          fromMail: 'some_string',
          fromName: 'some_string',
          greeting: 'some_string',
          logo: 'some_string',
          subject: 'some_string',
          text: 'some_string',
          title: 'some_string'
        }
      },
      'bringdata-jest'
    )
  })

  test('Should return 500 if CreateCampaign throws', async () => {
    const { sut, createCampaignStub } = makeSut()
    jest.spyOn(createCampaignStub, 'create').mockImplementationOnce(async () => {
      return new Promise((_resolve, reject) => reject(new Error()))
    })
    const httpRequest = JSON.parse(JSON.stringify(expectedBody))
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should return 200 even if no name is provided', async () => {
    const { sut } = makeSut()
    let httpRequest = JSON.parse(JSON.stringify(expectedBody))
    delete httpRequest.name
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.name).toBeTruthy()
  })

  test('Should return 200 even if no emailTemplate.buttonLabel is provided', async () => {
    const { sut } = makeSut()
    let httpRequest = JSON.parse(JSON.stringify(expectedBody))
    delete httpRequest.emailTemplate.buttonLabel
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.emailTemplate.buttonLabel).toBeTruthy()
  })
  test('Should call startEnrichment with correct values', async () => {
    const { sut, startEnrichment } = makeSut()
    const findRowsSpy = jest.spyOn(startEnrichment, 'start')
    let httpRequest = JSON.parse(JSON.stringify(expectedBody))
    await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(findRowsSpy).toHaveBeenCalledWith('valid_id', 'any_group_id', 'bringdata-jest')
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = JSON.parse(JSON.stringify(expectedBody))
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      uuid: 'valid_id',
      name: 'valid_name',
      owner: 'any_id',
      emailVariable: 'valid_email_variable',
      variables: [
        {
          name: 'valid_variable_name',
          question: 'valid_question',
          history: false,
          variableType: 0,
          lgpdJustification: 'any_lgpd_justification'
        }
      ],
      collectWays: ['valid_collect_ways'],
      emailTemplate: {
        buttonLabel: 'some_string',
        fromMail: 'some_string',
        fromName: 'some_string',
        greeting: 'some_string',
        logo: 'some_string',
        subject: 'some_string',
        text: 'some_string',
        title: 'some_string'
      }
    })
  })
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = JSON.parse(JSON.stringify(expectedBody))
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = JSON.parse(JSON.stringify(expectedBody))
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
