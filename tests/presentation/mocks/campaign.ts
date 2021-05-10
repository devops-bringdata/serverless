import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IGetCampaignList } from '@/domain/usecases'
import { IDeleteCampaign } from '@/domain/usecases/campaign/delete-campaign'
import { ok } from '@/presentation/helpers'
import { IHttpResponse } from '@/presentation/protocols'
import { mockCampaignModel } from '../../domain/mocks'

export class GetCampaignListSpy implements IGetCampaignList {
  schemaName: string
  result = [mockCampaignModel(), mockCampaignModel()]
  getCampaignList(schemaName: string): Promise<ICampaignModel[]> {
    this.schemaName = schemaName
    return new Promise((resolve) => {
      resolve(this.result)
    })
  }
}

export class DeleteCampaignSpy implements IDeleteCampaign {
  campaignId: string
  async delete(campaignId: string, _schemaName: string): Promise<IHttpResponse> {
    this.campaignId = campaignId
    return ok({ body: 'Campaign sucessfully removed' })
  }
}
