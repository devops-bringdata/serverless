export interface IDecrypter {
  format?(token: string): string
  decrypt(value: string): Promise<any>
}
