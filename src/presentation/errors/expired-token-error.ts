export class ExpiredTokenError extends Error {
  constructor() {
    super('ExpiredToken')
    this.name = 'ExpiredTokenError'
  }
}
