import { IGetEnrichmentRow } from '@/domain/usecases/enrichment/find-enrichment-row'
import { ITenant } from '@/domain/models/tenant'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'
import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { IFindCampaign } from '@/domain/usecases'
import { ICampaignModel } from '@/domain/models/campaign/campaign'

export class GetEnrichmentRowController implements IController {
  constructor(
    private getEnrichmentRow: IGetEnrichmentRow,
    private findCampaign: IFindCampaign,
    private decrypter: IDecrypter
  ) {}
  async handle(httpRequest: GetEnrichmentRowController.Params, _tenant?: ITenant): Promise<IHttpResponse> {
    if (!httpRequest.row) return badRequest(new MissingParamError('row'))
    const payload = await this.decrypter.decrypt(httpRequest.row)
    const rows = await this.getEnrichmentRow.get(payload.uuid, payload.schemaName).then((data) => data.row_enrichment)
    let campaign: ICampaignModel
    if (rows.length > 0) {
      campaign = await this.findCampaign.findById(rows[0].campaign, payload.schemaName)
    }
    return ok({ rows, campaign })
  }
}
export namespace GetEnrichmentRowController {
  export interface Params {
    row: string
  }
}
