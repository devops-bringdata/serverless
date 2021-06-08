import { Database } from '@/infra/db/typeorm/helpers/Database'
import { DeleteCampaignRepository } from '@/infra/db/typeorm/repositories/campaign'
import { datatype, random } from 'faker'
import { ok } from '@/presentation/helpers'
describe('Campaign Postgres Repository', () => {
  type SutTypes = {
    sut: DeleteCampaignRepository
  }
  const makeSut = (): SutTypes => {
    const sut = new DeleteCampaignRepository()
    return { sut }
  }
  test('should throw if connect throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'delete').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.delete(datatype.uuid(), random.word())
    await expect(promise).rejects.toThrow()
  })
  test('should return ok if deleted', async () => {
    const { sut } = makeSut()
    jest.spyOn(Database.prototype, 'getConnection').mockImplementationOnce((): any =>
      Promise.resolve({
        manager: {
          getRepository: () => {
            return {
              update: () => {
                return ok({ body: 'Campaign sucessfully removed' })
              }
            }
          }
        }
      })
    )
    const response = await sut.delete(datatype.uuid(), random.word())
    expect(response).toEqual(ok({ body: 'Campaign sucessfully removed' }))
  })
})
