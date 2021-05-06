import { IEmailSender } from '@/domain/usecases'

export class EmailSenderSpy implements IEmailSender {
  message: IEmailSender.Params
  result = new Promise((resolve) => {
    resolve({})
  })
  send(message: IEmailSender.Params): Promise<any> {
    this.message = message
    return this.result
  }
}
