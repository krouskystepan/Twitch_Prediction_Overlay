import express from 'express'
import { PORT, APP_URL } from './constants'
import { logInfo } from './utils/logger'

const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use('/auth', require('./routes/auth'))
app.use('/predictions', require('./routes/predictions'))

// Development only
if (process.env.NODE_ENV === 'development') {
  app.use('/mock-predictions', require('./routes/mockPredictions'))

  app.get('/dev', (_req, res) => {
    res.sendFile(__dirname + '/views/dev.html')
  })
}

app.listen(PORT, () => {
  logInfo('Server is running on', `${APP_URL}:${PORT}`)
})
