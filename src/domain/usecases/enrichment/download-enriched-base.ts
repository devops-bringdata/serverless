export interface IDownloadEnrichedBase {
  download(dataGroup: string, schemaName: string): Promise<any>
}
