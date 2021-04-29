import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import serverless from 'serverless-http'
import app from '../app'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { makeGetEnrichmentUploadedBasesController } from '../factories/get-enrichment-uploaded-bases'
const auth = adaptMiddleware(makeAuthMiddleware())
app.get('/enrichment-uploaded-bases', auth, adaptRoute(makeGetEnrichmentUploadedBasesController()))
export const handle = serverless(app)
