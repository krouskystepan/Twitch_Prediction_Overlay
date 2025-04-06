import express from 'express'
import { PORT, APP_URL } from './constants'

const app = express()

app.use('/predictions', require('./routes/predictions'))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, () => {
  console.log(
    `\x1b[32mServer is running on\x1b[0m \x1b[36m${APP_URL}:${PORT}\x1b[0m`
  )
})
