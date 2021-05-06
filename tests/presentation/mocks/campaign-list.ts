import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IGetCampaignList } from '@/domain/usecases'
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
