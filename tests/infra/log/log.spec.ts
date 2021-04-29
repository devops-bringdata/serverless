import { ok } from '../../../src/presentation/helpers'
import { IHttpResponse } from '../../../src/presentation/protocols'
import { LogLogDnaRepository } from '../../../src/infra/log/logdna-repository/log'

describe('Log Logdna repository', () => {
  test('Should create an erropr log on success', async () => {
    const sut = new LogLogDnaRepository()
    const errorResponse: IHttpResponse = await sut.logError('any_error')
    expect(errorResponse).toEqual(ok('any_error'))
  })
})
