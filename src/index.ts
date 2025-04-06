import express from 'express'
import { PORT, APP_URL } from './constants'
import { logInfo } from './utils/logger'

const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use('/predictions', require('./routes/predictions'))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, () => {
  logInfo('Server is running on', `${APP_URL}:${PORT}`)
})
