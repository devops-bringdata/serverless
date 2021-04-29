import { ITenant } from '@/domain/models/tenant'
import { lorem, random } from 'faker'

export const mockTenant = (): ITenant => {
  return {
    uuid: random.uuid(),
    schemaName: lorem.word(7)
  }
}
