import 'source-map-support/register'
import { adaptRoute } from '../adapters/lambda-expres-routes-adapter'
import serverless from 'serverless-http'
import app from '../app'
import { makeGetEnrichmentRowController } from '../factories/get-enrichment-row'
import { makeUpdateEnrichmentRowController } from '../factories/update-enrichment-row'

app.get('/enrichment-row', adaptRoute(makeGetEnrichmentRowController()))
app.put('/enrichment-row', adaptRoute(makeUpdateEnrichmentRowController()))
export const handle = serverless(app)
