import dotenv from 'dotenv'
dotenv.config()

import { Request, Response } from 'express'
import axios from 'axios'
import { startEventSubSession } from '../services/twitchSocket'
import { setUserSession } from '../services/sessionStore'
import { logError, logSuccess } from '../utils/logger'

export const login = (req: Request, res: Response): void => {
  const authorizationUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_REDIRECT_URI}&scope=channel:read:predictions`
  res.redirect(authorizationUrl)
}

export const callback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string

  if (!code) {
    logError('No code found in the URL')
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
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.TWITCH_REDIRECT_URI,
        },
      }
    )

    const token = response.data.access_token

    const userResponse = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${token}`,
      },
    })

    const user = userResponse.data.data[0]
    const broadcasterId = user.id
    const displayName = user.display_name
    const login = user.login

    setUserSession(login, { token, broadcasterId })

    startEventSubSession(token, broadcasterId)

    logSuccess(`Authorization successful for ${displayName} (${broadcasterId})`)
    res.redirect('/predictions/' + login)
  } catch (error: any) {
    logError('Error getting the access token')
    res.status(500).send('Error getting the access token')
  }
}
