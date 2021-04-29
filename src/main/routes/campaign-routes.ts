import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import { makeCampaignController } from '../factories/campaign'
import serverless from 'serverless-http'
import app from '../app'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
const auth = adaptMiddleware(makeAuthMiddleware())
app.post('/campaign', auth, adaptRoute(makeCampaignController()))
app.get('/campaign', (_req, res) => {
  res.json({ ok: process.env.STAGE, env: process.env })
})
export const handle = serverless(app)
