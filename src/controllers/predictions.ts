import { Request, Response } from 'express'
import axios from 'axios'

export const getPredictions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.query.token as string

  if (!token) {
    res.status(400).send('Token is required')
    return
  }

  const clientId = process.env.TWITCH_CLIENT_ID
  const channelName = process.env.CHANNEL_NAME

  if (!clientId) {
    res.status(500).send('Client ID is not configured')
    return
  }

  if (!channelName) {
    res.status(500).send('Channel name is not configured')
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
}
