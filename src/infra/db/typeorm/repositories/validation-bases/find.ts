import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'
import { IFindValidationBase } from '@/domain/usecases'
import { ValidationBase } from '../../entities'
import { Database } from '../../helpers/Database'

export class FindValidationBaseRepository implements IFindValidationBase {
  async find(schemaName: string, params: IFindValidationBase.Params): Promise<IValidationBaseModel> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const validationBaseRepository = connection.manager.getRepository(ValidationBase)
    return await validationBaseRepository.findOne({
      storeName: params.validationGroup
    })
  }
}
