import request from 'supertest'
import app from '@/main/app'
import serverless from 'serverless-http'
describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content_type', (_req, res) => {
      res.send()
    })
    serverless(app)
    await request(app).get('/test_content_type').expect('content-type', /json/)
  })
  test('should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (_req, res) => {
      res.type('xml')
      res.send()
    })
    serverless(app)
    await request(app).get('/test_content_type_xml').expect('content-type', /xml/)
  })
})
