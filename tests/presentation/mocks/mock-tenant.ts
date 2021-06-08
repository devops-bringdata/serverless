import { ITenant } from '@/domain/models/tenant'
import { datatype, lorem } from 'faker'

export const mockTenant = (): ITenant => {
  return {
    uuid: datatype.uuid(),
    schemaName: lorem.word(7)
  }
}
