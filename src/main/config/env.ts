import * as path from 'path'
import * as dotenv from 'dotenv'
const environment = process.env.STAGE || 'staging'
const p = path.join(process.cwd(), `env/${environment}.env`)
console.log(`Loading environment from ${p}`)
const dotEnvOptions = {
  path: p
}
dotenv.config(dotEnvOptions)
export const env = {}
