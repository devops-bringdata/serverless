import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IFindCampaign } from '@/domain/usecases'
import { internet, lorem, random, name } from 'faker'

export const makeFindCampaign = (): IFindCampaign => {
  class FindCampaignStub implements IFindCampaign {
    variableName = random.word()
    emailVariable = random.word()
    email = internet.email()
    response = {
      uuid: random.uuid(),
      name: random.words(3),
      owner: random.uuid(),
      emailVariable: this.emailVariable,
      variables: [
        {
          name: this.variableName,
          question: `What is your ${this.variableName}`,
          history: random.boolean(),
          variableType: 0,
          lgpdJustification: lorem.paragraph(3)
        }
      ],
      collectWays: ['EMAIL', 'SMS'],
      emailTemplate: {
        buttonLabel: random.word(),
        fromMail: this.email,
        fromName: this.email.split('@')[0],
        greeting: 'Hello',
        logo: internet.url(),
        subject: random.words(3),
        text: lorem.lines(4),
        title: random.words(4)
      },
      resendDate: new Date()
    }
    findById(_campaignId: string, _schemaName: any): Promise<ICampaignModel> {
      return new Promise((resolve) => resolve(this.response))
    }
  }
  return new FindCampaignStub()
}

export const mockCampaignModel = (): ICampaignModel => {
  return {
    uuid: random.uuid(),
    name: lorem.word(),
    owner: random.uuid(),
    emailVariable: lorem.word(),
    variables: [
      {
        name: lorem.word(),
        question: lorem.sentence(4),
        history: true,
        variableType: 0,
        lgpdJustification: lorem.sentence(6)
      }
    ],
    collectWays: ['EMAIL', 'SMS'],
    emailTemplate: {
      buttonLabel: lorem.sentence(2),
      fromMail: internet.email(name.firstName(), name.lastName()),
      fromName: name.firstName(),
      greeting: 'Hello',
      logo: internet.url(),
      subject: lorem.sentence(5),
      text: lorem.paragraphs(2),
      title: lorem.words(4)
    },
    resendDate: new Date()
  }
}
