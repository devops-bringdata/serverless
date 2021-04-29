export interface IStartEnrichment {
  start(campaignId: string, groupId: string, schemaName: string): Promise<any>
}
