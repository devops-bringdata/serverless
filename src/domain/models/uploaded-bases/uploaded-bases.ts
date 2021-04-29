export type IUploadedBaseModel = {
  uuid: string
  group: string
  campaign: string
  fileName: string
  validated: boolean
  mustEnrich: boolean
  collectedDataQuantity: number
}

export type UploadedBaseModelSave = {
  group: string
  campaign: string
  fileName: string
  validated: boolean
  mustEnrich: boolean
  collectedDataQuantity: number
}
