import { IHttpResponse } from '@/presentation/protocols'
import * as logdna from '@logdna/logger'
import { once } from 'events'
const logger: logdna.Logger = logdna.createLogger('9179b84dbadbe414ad58b74d108d8145', {
  app: 'bringdata-enrichment'
})
// export function logDebug(message, data?) {
//   logger.debug(message)
//   this.logger.debug(data)
// }
export async function logDnaError(stack: string): Promise<IHttpResponse> {
  logger.error(stack)
  return await once(logger, 'send').then((result) => {
    return { statusCode: result[0].httpStatus, body: result[0].firstLine }
  })
}
