import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import serverless from 'serverless-http'
import app from '../app'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { makeDownloadEnrichedBaseController } from '../factories/download-enriched-base'
const auth = adaptMiddleware(makeAuthMiddleware())
app.get('/download-enriched-base', auth, adaptRoute(makeDownloadEnrichedBaseController()))
export const handle = serverless(app)
