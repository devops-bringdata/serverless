export interface IEncrypter {
  encrypt: (payload: any) => Promise<string>
}
