import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import serverless from 'serverless-http'
import app from '../app'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { makeGetValidateEnrichmentEmailController } from '../factories/email-validation'
const auth = adaptMiddleware(makeAuthMiddleware())
app.post('/validate-enrichment-email', auth, adaptRoute(makeGetValidateEnrichmentEmailController()))
export const handle = serverless(app)
