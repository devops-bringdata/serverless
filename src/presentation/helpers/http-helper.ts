import { ServerError } from '../errors'
import { IHttpResponse } from '../protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error
})

export const unauthorized = (error: Error): IHttpResponse => ({
  statusCode: 401,
  body: error
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})
