import { Database } from '@/infra/db/typeorm/helpers/Database'
import { Connection, ConnectionManager } from 'typeorm'

type SutTypes = {
  sut: Database
}
const makeSut = (): SutTypes => {
  const sut = new Database()
  jest.spyOn(Connection.prototype, 'connect').mockImplementationOnce((): any => {
    return {
      connect: () => {
        return new Promise((resolve) => {
          resolve({ isConnected: true })
        })
      },
      close: () => {}
    }
  })
  jest.spyOn(Connection.prototype, 'close').mockReturnValueOnce(Promise.resolve())
  return {
    sut
  }
}
describe('Database', () => {
  test('should create a connection with name core', async () => {
    const { sut } = makeSut()
    await sut.getConnection('core')
    expect(sut.connectionManager.has('core')).toBeTruthy()
  })
  test('should create a connection with name default', async () => {
    const { sut } = makeSut()
    await sut.getConnection('anotherName')
    expect(sut.connectionManager.has('default')).toBeTruthy()
  })
  test('should call attribute connection manager to connection', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut.connectionManager, 'has').mockReturnValueOnce(true)
    await sut.getConnection('core')
    expect(sut.connection).toBeTruthy()
  })
  test('should call attribute connection manager to connection', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut.connectionManager, 'has').mockReturnValueOnce(true)
    await sut.getConnection('anotherName')
    expect(sut.connection).toBeTruthy()
  })
  test('should call connect if is not connected', async () => {
    const { sut } = makeSut()
    jest.spyOn(ConnectionManager.prototype, 'get').mockImplementationOnce((): any => {
      return {
        isConnected: true
      }
    })
    await sut.getConnection('anotherName')
    expect(sut.connection).toBeTruthy()
  })
  test('should call connect if is not connected', async () => {
    const { sut } = makeSut()
    jest.spyOn(ConnectionManager.prototype, 'get').mockImplementationOnce((): any => {
      return {
        isConnected: true
      }
    })
    await sut.getConnection('core')
    expect(sut.connection).toBeTruthy()
  })
  test('should call connection.close', async () => {
    const { sut } = makeSut()

    await sut.getConnection('core')
    const response = await sut.disconnect()
    expect(response).toBeUndefined()
  })
  test('should not call connection.close', async () => {
    const { sut } = makeSut()
    await sut.disconnect()
    const spy = jest.spyOn(Connection.prototype, 'close')
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
