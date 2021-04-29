import { Request, Response } from 'express'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      ...(req.body || {}),
      ...(req.query || {})
    }
    const httpResponse: IHttpResponse = await controller.handle(httpRequest, req.tenant)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
