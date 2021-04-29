import { ITenant } from '@/domain/models/tenant'
import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements IController {
  constructor(private controller: IController, private logErrorRepository: ILogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle(httpRequest: IHttpRequest, tenant?: ITenant): Promise<IHttpResponse> {
    const httpResponse: IHttpResponse = await this.controller.handle(httpRequest, tenant)
    if (httpResponse.statusCode >= 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
