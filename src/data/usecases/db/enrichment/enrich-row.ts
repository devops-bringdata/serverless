import { IEncrypter } from '@/data/protocols'
import { ICampaignModel } from '@/domain/models/campaign/campaign'
import { IRowEnrichment } from '@/domain/models/uploaded-data/row-enrichment'
import { IUploadedDataModel } from '@/domain/models/uploaded-data/uploaded-data'
import { IEnrichRow, IEmailSender, IUpdateUploadedData } from '@/domain/usecases'
import { ServerError } from '@/presentation/errors'
import { serverError } from '@/presentation/helpers'

// TODO: adicionar enriquecimento para dados não faltantes
export class EnrichRow implements IEnrichRow {
  // private enrichmentRow: Array<IRowEnrichment>
  constructor(
    private emailSender: IEmailSender,
    private updateUploadedData: IUpdateUploadedData,
    private encrypter: IEncrypter
  ) {}
  async enrich(row: IUploadedDataModel, campaign: ICampaignModel, schemaName: string): Promise<any> {
    if (!row || !campaign) return serverError(new ServerError('Row Content was not founded'))
    let enrichmentRow: IRowEnrichment[] = []
    const rowContent = row.row_content
    if (!rowContent) return serverError(new ServerError('Row with no content'))

    const rowId = row.uuid
    const email = rowContent.find((x) => x.header === campaign.emailVariable)?.value
    if (!email) return null
    campaign.variables.map((variable) => {
      let whereClause
      if (variable.variableType === 1) whereClause = (x) => x.header === variable.name
      else whereClause = (x) => x.header === variable.name && (x.value === '' || !x.value)
      const founded = rowContent.find(whereClause)
      if (founded) {
        console.log(founded)
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
            result: founded.value || null,
            fieldType: variable.fieldType,
            inputConfigurations: variable.inputConfigurations
          })
        }
      }
    })
    if (!enrichmentRow.length) {
      return null
    }
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
