import { ILogErrorRepository } from '../../../src/data/protocols/log-error-repository'
import { serverError } from '../../../src/presentation/helpers'
import { IController, IHttpRequest, IHttpResponse } from '../../../src/presentation/protocols'
import { LogControllerDecorator } from '../../../src/main/decorators/log'
const expectedBody = {
  name: 'valid_name',
  owner: 'valid_user_id',
  emailVariable: 'valid_email_variable',
  variables: [
    {
      name: 'valid_variable_name',
      question: 'valid_question'
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
  resendDate: 'optional date to resend the campaign'
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(_httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const httpResponse: IHttpResponse = {
        statusCode: 200,
        body: { name: 'valid_name' }
      }
      return new Promise((resolve) => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async logError(_stack: string): Promise<IHttpResponse> {
      return new Promise((resolve) => resolve({ statusCode: 200, body: 'ok' }))
    }
  }
  return new LogErrorRepositoryStub()
}
interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}
describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: expectedBody
    }
    await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(handleSpy).toHaveBeenCalledWith(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
  })

  test('Should return same result of controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: expectedBody
    }
    const httpResponse = await sut.handle(httpRequest, {
      schemaName: 'bringdata-jest',
      uuid: 'any_id'
    })
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: { name: 'valid_name' }
    })
  })

  test('Should call LogErrorRepository with correct error if controller returs a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(error)))
    const httpRequest = {
      body: expectedBody
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
