import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import serverless from 'serverless-http'
import app from '../app'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { makeGetValidateSingleEmailController } from '../factories/email-validation'
const auth = adaptMiddleware(makeAuthMiddleware())
app.post('/validate-single-email', auth, adaptRoute(makeGetValidateSingleEmailController()))
export const handle = serverless(app)
