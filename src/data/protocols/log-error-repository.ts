import { IHttpResponse } from '@/presentation/protocols'

export interface ILogErrorRepository {
  logError(stack: string): Promise<IHttpResponse>
}
