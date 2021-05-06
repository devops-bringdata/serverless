import { ITenant } from '@/domain/models/tenant'
import { IGetCampaignList } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import { IController, IHttpResponse } from '@/presentation/protocols'

export class GetCampaignListController implements IController {
  constructor(private getCampaignListRepository: IGetCampaignList) {}
  async handle(_request: any, tenant?: ITenant): Promise<IHttpResponse> {
    const campaignList = await this.getCampaignListRepository.getCampaignList(tenant.schemaName)
    return ok(campaignList)
  }
}
