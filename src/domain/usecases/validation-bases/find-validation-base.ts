import { IValidationBaseModel } from '@/domain/models/validation-bases/validation-base'

export interface IFindValidationBase {
  find(schemaName: string, params: IFindValidationBase.Params): Promise<IValidationBaseModel>
}
export namespace IFindValidationBase {
  export type Params = {
    validationGroup: string
  }
}
