import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import serverless from 'serverless-http'
import app from '../app'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
import { makeChargeCreditsController } from '../factories/charge-credits'
const auth = adaptMiddleware(makeAuthMiddleware())
app.post('/charge-credits', auth, adaptRoute(makeChargeCreditsController()))

export const handle = serverless(app)
