import 'source-map-support/register'
import serverless from 'serverless-http'
import app from '../app'
app.get('/health', (_req, res) => {
  res.json({ status: 'Healthy', vars: process.env })
})
export const handle = serverless(app)
