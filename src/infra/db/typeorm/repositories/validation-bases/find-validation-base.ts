import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'
import { IFindValidationBase } from '@/domain/usecases/validation-bases/find-validation-base'
import { ValidationBase } from '../../entities/ValidationBase'
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
