import express from 'express'
import setupMiddlewares from '../main/config/middlewares'
import 'reflect-metadata'
const app = express()
setupMiddlewares(app)
export default app
