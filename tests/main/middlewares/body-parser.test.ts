import request from 'supertest'
import app from '@/main/app'
import serverless from 'serverless-http'
describe('Body Parser Middleware', () => {
  test('Should parse body as json ', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    serverless(app)
    await request(app).post('/test_body_parser').send({ name: 'Samuel' }).expect({ name: 'Samuel' })
  })
})
