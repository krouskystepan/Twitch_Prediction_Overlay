import { Request, Response } from 'express'
import axios from 'axios'
import { getUserSession } from '../services/sessionStore'
import { logError, logInfo } from '../utils/logger'

export const getPredictions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const channelName = req.params.channelName as string

  if (!channelName) {
    logError('CHANNEL_NAME not provided in request')
    res.status(400).send('CHANNEL_NAME is required in the request')
    return
  }

  const session = getUserSession(channelName)
  if (!session) {
    logError('User session not found')
    res.status(401).send('User is not authenticated')
    return
  }

  const { token, broadcasterId } = session
  const clientId = process.env.TWITCH_CLIENT_ID

  if (!clientId) {
    logError('TWITCH_CLIENT_ID not set in environment variables')
    res.status(500).send('TWITCH_CLIENT_ID not set')
    return
  }

  try {
    const predictionsResponse = await axios.get(
      'https://api.twitch.tv/helix/predictions',
      {
        headers: {
          'Client-ID': clientId!,
          Authorization: `Bearer ${token}`,
        },
        params: {
          broadcaster_id: broadcasterId,
        },
      }
    )

    logInfo(`Successfully fetched predictions for broadcaster ${broadcasterId}`)
    res.json(predictionsResponse.data)
  } catch (error) {
    logError('Error fetching predictions', error)
    res.status(500).send('Error fetching predictions')
  }
}
