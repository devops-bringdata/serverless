import { IHttpResponse } from '@/presentation/protocols'

export interface IDeleteCampaign {
  delete(campaignId: string, schemaName: string): Promise<IHttpResponse>
}
