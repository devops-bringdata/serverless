import { IEmailSender } from '@/domain/usecases/send-email/email-sender'
import * as SendGrid from '@sendgrid/mail'
export class SendgridAdapter implements IEmailSender {
  async send(message: IEmailSender.Params): Promise<any> {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY)
    const msg: any = {
      personalizations: [
        {
          to: [
            {
              email: message.to
            }
          ],
          dynamic_template_data: message.dynamic_template_data
        }
      ],
      from: {
        email: message.from,
        name: message.fromName
      },
      template_id: message.template
    }

    await SendGrid.send(msg).catch((error) => {
      throw error
    })
    return new Promise((resolve) => resolve(message))
  }
}
