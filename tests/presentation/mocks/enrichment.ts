import { IStartEnrichment } from '@/domain/usecases'

export class StartEnrichmentSpy implements IStartEnrichment {
  campaignId: string
  groupId: string
  start(campaignId: string, groupId: string, _schemaName: string): Promise<any> {
    this.campaignId = campaignId
    this.groupId = groupId
    return
  }
}
