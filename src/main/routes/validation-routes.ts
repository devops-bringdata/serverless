import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import serverless from 'serverless-http'
import app from '../app'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { makeFinishGroupValidationController } from '../factories/finish-group-validation'
const auth = adaptMiddleware(makeAuthMiddleware())
app.post('/finish-group-validation', auth, adaptRoute(makeFinishGroupValidationController()))
export const handle = serverless(app)
