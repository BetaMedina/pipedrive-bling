import server from './config/app'
import { config } from 'dotenv'
import { MongoHelper } from '../infra/db/mongo/helper/mongo.helper'
config()

MongoHelper.connect(process.env.MONGO_URI).then(() => {
  server.listen('3333', () => {
    console.log('Server is running on port 3333 ')
  })
})
