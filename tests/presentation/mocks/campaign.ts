import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { ICreateCampaign, IGetCampaignList } from '@/domain/usecases'
import { IDeleteCampaign } from '@/domain/usecases/campaign/delete-campaign'
import { IDuplicateCampaign } from '@/domain/usecases/campaign/duplicate-campaign'
import { IGetCampaign } from '@/domain/usecases/campaign/get-campaign'
import { IUpdateCampaign } from '@/domain/usecases/campaign/update-campaign'
import { ok } from '@/presentation/helpers'
import { IHttpResponse } from '@/presentation/protocols'
import { datatype, internet, lorem, name, random } from 'faker'
import { mockCampaignModel } from '../../domain/mocks'

export const mockCampaign = (): ICampaignModel => {
  return {
    collectWays: ['EMAIL', 'SMS'],
    emailTemplate: {
      buttonLabel: random.word(),
      fromMail: internet.email(),
      fromName: internet.userName(),
      greeting: random.word(),
      subject: random.word(),
      text: lorem.paragraphs(3),
      title: name.title(),
      logo: internet.url()
    },
    emailVariable: random.word(),
    name: name.title(),
    owner: datatype.uuid(),
    uuid: datatype.uuid(),
    variables: [
      {
        fieldType: random.word(),
        history: datatype.boolean(),
        inputConfigurations: { emailValidation: {}, phoneValidation: {} },
        name: name.title(),
        question: lorem.sentence(),
        variableType: datatype.number(1),
        lgpdJustification: lorem.sentence()
      }
    ]
  }
}

export class GetCampaignSpy implements IGetCampaign {
  campaignId: string
  result = mockCampaignModel()
  async get(campaignId: string, _schemaName: string): Promise<ICampaignModel> {
    this.campaignId = campaignId
    return this.result
  }
}

export class CreateCampaignSpy implements ICreateCampaign {
  campaign: ICreateCampaign.Params
  result: ICampaignModel = mockCampaign()
  async create(campaign: ICreateCampaign.Params, _tenant: string): Promise<ICampaignModel> {
    this.campaign = campaign
    return this.result
  }
}

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

export class DuplicateCampaignSpy implements IDuplicateCampaign {
  campaignId: string
  async duplicate(campaignId: string, _schemaName: string): Promise<IHttpResponse> {
    this.campaignId = campaignId
    return ok({ body: 'Campaign sucessfully duplicated' })
  }
}

export class UpdateCampaignSpy implements IUpdateCampaign {
  campaign: IUpdateCampaign.Params
  async update(campaign: IUpdateCampaign.Params, _tenant: string): Promise<ICampaignModel> {
    this.campaign = campaign
    return { uuid: datatype.uuid(), ...this.campaign }
  }
}
