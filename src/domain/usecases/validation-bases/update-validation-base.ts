import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'

export interface IUpdateValidationBase {
  update(schemaName: string, params: IValidationBaseModel): Promise<IValidationBaseModel>
}
