export interface IEmailSender {
  send(message: IEmailSender.Params): Promise<any>
}

export namespace IEmailSender {
  export type Params = {
    to: string
    from: string
    subject?: string
    text?: string
    html?: string
    template?: string
    fromName?: string
    dynamic_template_data?: any
  }
}
