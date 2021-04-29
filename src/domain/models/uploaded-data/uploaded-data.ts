import { RowContent } from './row-content'
import { IRowEnrichment } from './row-enrichment'
import IRowValidation from './row-validation'

export interface IUploadedDataModel {
  uuid: string
  uploadedDataGroup: string
  row_number: number
  row_content: RowContent[]
  row_validation: IRowValidation
  row_enrichment: IRowEnrichment[]
}
