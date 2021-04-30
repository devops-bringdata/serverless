import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IEnrichRow } from '@/domain/usecases/enrichment/enrich-row'
import { IEmailSender } from '@/domain/usecases/send-email/email-sender'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { serverError } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { IUpdateUploadedData } from '@/domain/usecases/update-uploaded-data/update-uploaded-data'
import { IEncrypter } from '@/data/protocols/criptography/encrypter'

// TODO: adicionar enriquecimento para dados não faltantes
export class EnrichRow implements IEnrichRow {
  // private enrichmentRow: Array<IRowEnrichment>
  constructor(
    private emailSender: IEmailSender,
    private updateUploadedData: IUpdateUploadedData,
    private encrypter: IEncrypter
  ) {}
  async enrich(row: IUploadedDataModel, campaign: ICampaignModel, schemaName: string): Promise<any> {
    const enrichmentRow = []

    const rowContent = row.row_content
    if (!rowContent) return serverError(new ServerError('Row Content was not founded'))
    const rowId = row.uuid
    const email = rowContent.find((x) => x.header === campaign.emailVariable)?.value
    if (!email) return
    campaign.variables.map((variable) => {
      let whereClause
      if (variable.variableType === 1) whereClause = (x) => x.header === variable.name
      else whereClause = (x) => x.header === variable.name && (x.value === '' || !x.value)
      const founded = rowContent.find(whereClause)
      if (founded) {
        const variable = campaign.variables.find((x) => x.name === founded.header)
        const question = variable.question
        const lgpdJustification = variable.lgpdJustification
        if (!enrichmentRow.find((x) => x.header === founded.header)) {
          enrichmentRow.push({
            campaign: campaign.uuid,
            header: founded.header,
            question,
            lgpdJustification,
            variableType: variable.variableType,
            history: variable.history || false,
            result: founded.value || null
          })
        }
      }
    })
    if (enrichmentRow.length !== 0) {
      row.row_enrichment = enrichmentRow
      await this.updateUploadedData.update(rowId, row, schemaName)

      const templateData = {
        title: campaign.emailTemplate.title,
        text: campaign.emailTemplate.text,
        organizationName: campaign.emailTemplate.fromName,
        buttonLabel: campaign.emailTemplate.buttonLabel,
        logo: campaign.emailTemplate.logo,
        subject: campaign.emailTemplate.subject,
        greeting: campaign.emailTemplate.greeting,
        hashLink: await this.encrypter.encrypt({
          schemaName,
          uuid: rowId
        }),
        enrichmentLink:
          process.env.ENVIRONMENT === 'staging'
            ? 'https://app-staging.bringdata.co/data-update'
            : 'https://app.bringdata.co/data-update'
      }
      const sendResponse = await this.emailSender.send({
        to: email,
        from: campaign.emailTemplate.fromMail,
        fromName: campaign.emailTemplate.fromName,
        template: 'd-ee8d704e20354f108b6da551deb973fc',
        dynamic_template_data: templateData
      })
      return sendResponse
    }
  }
}
