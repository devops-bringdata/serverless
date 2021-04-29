import { IMiddleware, IHttpRequest } from '@/presentation/protocols'
import { NextFunction, Request, Response } from 'express'
export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest, req.tenant)
    if (httpResponse.statusCode === 200) {
      req.tenant = httpResponse.body

      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
