import { IHttpResponse } from '@/presentation/protocols'

export interface IDuplicateCampaign {
  duplicate(campaignId: string, schemaName: string): Promise<IHttpResponse>
}
