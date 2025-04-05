import express, { Request, Response } from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3000

// Route to initiate the OAuth flow
app.get('/login', (req: Request, res: Response): void => {
  const authorizationUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_REDIRECT_URI}&scope=channel:read:predictions`
  res.redirect(authorizationUrl)
})

// Route to handle callback and exchange code for access token
app.get('/callback', async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string

  if (!code) {
    res.status(400).send('No code found in the URL')
    return
  }

  try {
    const response = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      null,
      {
        params: {
          client_id: process.env.TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_CLIENT_SECRET,
          code: code, // The code from the query string
          grant_type: 'authorization_code',
          redirect_uri: process.env.TWITCH_REDIRECT_URI,
        },
      }
    )

    const token = response.data.access_token
    console.log('User OAuth Token:', token)
    res.send(`Authorization successful! Your token is: ${token}`)
  } catch (error) {
    res.status(500).send('Error getting the access token')
  }
})

// Route to fetch predictions for the channel
app.get('/predictions', async (req: Request, res: Response): Promise<void> => {
  const token = req.query.token as string
  const clientId = process.env.TWITCH_CLIENT_ID
  const channelName = process.env.CHANNEL_NAME

  if (!token) {
    res.status(400).send('Token is required')
    return
  }

  try {
    // Get user ID from Twitch API
    const userIdResponse = await axios.get(
      'https://api.twitch.tv/helix/users',
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${token}`,
        },
        params: {
          login: channelName,
        },
      }
    )

    const userId = userIdResponse.data.data[0].id

    // Fetch predictions for the broadcaster (user)
    const predictionsResponse = await axios.get(
      'https://api.twitch.tv/helix/predictions',
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${token}`,
        },
        params: {
          broadcaster_id: userId,
        },
      }
    )

    res.json(predictionsResponse.data)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching predictions')
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
