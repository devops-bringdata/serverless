import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'
import { IFindValidationBase } from '@/domain/usecases/validation-bases/find-validation-base'
import { IUpdateValidationBase } from '@/domain/usecases/validation-bases/update-validation-base'
import { mockValidationBase } from '../../../tests/domain/mocks/validation-base-results'

export class FindValidationBaseSpy implements IFindValidationBase {
  params: IFindValidationBase.Params
  result: IValidationBaseModel = mockValidationBase()
  async find(_schemaName: string, params: IFindValidationBase.Params): Promise<IValidationBaseModel> {
    this.params = params
    return this.result
  }
}

export class UpdateValidationBaseSpy implements IUpdateValidationBase {
  params: IValidationBaseModel
  result: IValidationBaseModel = mockValidationBase()
  async update(_schemaName: string, params: IValidationBaseModel): Promise<IValidationBaseModel> {
    this.params = params
    return this.result
  }
}
