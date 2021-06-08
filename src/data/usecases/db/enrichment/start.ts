import { IStartEnrichment, IFindUploadedDataByGroupId, IFindCampaign, IEnrichRow } from '@/domain/usecases'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers'

export class StartEnrichment implements IStartEnrichment {
  constructor(
    private DbFindUploadedDataByGroupId: IFindUploadedDataByGroupId,
    private dbFindCampaign: IFindCampaign,
    private enrichRow: IEnrichRow
  ) {}
  public async start(campaignId: string, groupId: string, schemaName: string): Promise<any> {
    if (!campaignId) return badRequest(new MissingParamError('campaignId'))
    if (!groupId) return badRequest(new MissingParamError('groupId'))
    const campaign = await this.dbFindCampaign.findById(campaignId, schemaName)
    if (!campaign) {
      return serverError(new ServerError('Campaign not found on start enrichment'))
    }
    const rowsToEnrich = await this.DbFindUploadedDataByGroupId.findRows(groupId, schemaName)
    await Promise.all(
      rowsToEnrich.map(async (row) => {
        await this.enrichRow.enrich(row, campaign, schemaName)
      })
    )
    return rowsToEnrich
  }
}
