import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import serverless from 'serverless-http'
import app from '../app'
import { makeGetEnrichmentRowsController } from '../factories/get-enrichment-rows'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { makeStartEnrichmentController } from '../factories/enrichment'
const auth = adaptMiddleware(makeAuthMiddleware())
app.get('/enrichment-rows', auth, adaptRoute(makeGetEnrichmentRowsController()))
app.post('/start-enrichment', auth, adaptRoute(makeStartEnrichmentController()))
export const handle = serverless(app)
