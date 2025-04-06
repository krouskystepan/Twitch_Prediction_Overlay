import { Request, Response } from 'express'
import axios from 'axios'

import dotenv from 'dotenv'
dotenv.config()

export const login = (req: Request, res: Response): void => {
  const authorizationUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_REDIRECT_URI}&scope=channel:read:predictions`
  res.redirect(authorizationUrl)
}

export const callback = async (req: Request, res: Response): Promise<void> => {
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
}
