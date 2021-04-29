import request from 'supertest'
import app from '@/main/app'
import serverless from 'serverless-http'
describe('Cors Middleware', () => {
  test('should enable CORS', async () => {
    app.get('/test_cors', (_req, res) => {
      res.send()
    })
    serverless(app)
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
