import { IUser } from './campaign/user'
import { IOrganization } from './organization'

export interface IApiKey {
  uuid: string
  user: IUser
  organization: IOrganization
  key: string
  expirationDate: Date
}
