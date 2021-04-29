import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { verify, sign } from 'jsonwebtoken'
export class JwtAdapter implements IDecrypter {
  constructor(private readonly secret: string) {}
  async decrypt(token: string): Promise<string> {
    const value: any = verify(this.format(token), this.secret)
    return value
  }
  async encrypt(payload: any): Promise<string> {
    return sign(payload, this.secret)
  }
  format(token: string): string {
    if (token.includes('Bearer ')) {
      return token.split('Bearer ')[1]
    } else return token
  }
}
