import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'
import { IFindValidationBase } from '@/domain/usecases/validation-bases/find-validation-base'
import { ValidationBase } from '../../entities/validation-base'
import { connect } from '../../helpers/connection'

export class FindValidationBaseRepository implements IFindValidationBase {
  async find(schemaName: string, params: IFindValidationBase.Params): Promise<IValidationBaseModel> {
    const validationBaseRepository = (await connect(schemaName)).manager.getRepository(ValidationBase)
    return await validationBaseRepository.findOne({
      storeName: params.validationGroup
    })
  }
}
