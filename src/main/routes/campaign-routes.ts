import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import {
  makeCreateCampaignController,
  makeCreateGetCampaignListController,
  makeDeleteCampaignController,
  makeDuplicateCampaignController,
  makeGetCampaignController,
  makeUpdateCampaignController
} from '../factories/campaign'
import serverless from 'serverless-http'
import app from '../app'
import { makeAuthMiddleware } from '../factories/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/lambda-express-middleware-adapter'
const auth = adaptMiddleware(makeAuthMiddleware())
app.post('/campaign', auth, adaptRoute(makeCreateCampaignController()))
app.get('/get-campaign', auth, adaptRoute(makeGetCampaignController()))
app.get('/campaign-list', auth, adaptRoute(makeCreateGetCampaignListController()))
app.delete('/delete-campaign', auth, adaptRoute(makeDeleteCampaignController()))
app.get('/duplicate-campaign', auth, adaptRoute(makeDuplicateCampaignController()))
app.patch('/update-campaign', auth, adaptRoute(makeUpdateCampaignController()))
export const handle = serverless(app)
