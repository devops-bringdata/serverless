import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'
import { IUpdateValidationBase } from '@/domain/usecases/validation-bases/update-validation-base'
import { ValidationBase } from '../../entities/validation-base'
import { connect } from '../../helpers/connection'

export class UpdateValidationBaseRepository implements IUpdateValidationBase {
  async update(schemaName: string, params: IValidationBaseModel): Promise<IValidationBaseModel> {
    const validationBaseRepository = (await connect(schemaName)).manager.getRepository(ValidationBase)
    const validationBaseId = params.uuid
    delete params.uuid
    const result: IValidationBaseModel = await validationBaseRepository
      .update(validationBaseId, params)
      .then((data) => data.raw[0])
    return result
  }
}
