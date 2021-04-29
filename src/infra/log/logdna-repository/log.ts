import { ILogErrorRepository } from '@/data/protocols/log-error-repository'
import { IHttpResponse } from '@/presentation/protocols'
import { logDnaError } from '../helpers/LogDnaHelper'

export class LogLogDnaRepository implements ILogErrorRepository {
  logError(stack: string): Promise<IHttpResponse> {
    return logDnaError(stack)
  }
}
