import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'
import { IUpdateValidationBase } from '@/domain/usecases/validation-bases/update-validation-base'
import { ValidationBase } from '../../entities/ValidationBase'
import { Database } from '../../helpers/Database'

export class UpdateValidationBaseRepository implements IUpdateValidationBase {
  async update(schemaName: string, params: IValidationBaseModel): Promise<IValidationBaseModel> {
    const database = new Database()
    const connection = await database.getConnection(schemaName)
    const validationBaseRepository = connection.manager.getRepository(ValidationBase)
    const validationBaseId = params.uuid
    delete params.uuid
    const result: IValidationBaseModel = await validationBaseRepository
      .update(validationBaseId, params)
      .then((data) => data.raw[0])
    return result
  }
}
