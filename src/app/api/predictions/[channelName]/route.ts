import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { getUserSession } from '@/services/sessionStore'
import { logError, logInfo } from '@/utils/logger'

export async function GET(
  req: NextRequest,
  { params }: { params: { channelName: string } }
) {
  const { channelName } = params

  if (!channelName) {
    logError('CHANNEL_NAME not provided in request')
    return NextResponse.json(
      { error: 'CHANNEL_NAME is required in the request' },
      { status: 400 }
    )
  }

  const session = getUserSession(channelName)
  if (!session) {
    logError('User session not found')
    return NextResponse.json(
      { error: 'User is not authenticated' },
      { status: 401 }
    )
  }

  const { token, broadcasterId } = session
  const clientId = process.env.TWITCH_CLIENT_ID

  if (!clientId) {
    logError('TWITCH_CLIENT_ID not set in environment variables')
    return NextResponse.json(
      { error: 'TWITCH_CLIENT_ID not set' },
      { status: 500 }
    )
  }

  try {
    const predictionsResponse = await axios.get(
      'https://api.twitch.tv/helix/predictions',
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${token}`,
        },
        params: {
          broadcaster_id: broadcasterId,
        },
      }
    )

    logInfo(`Successfully fetched predictions for broadcaster ${broadcasterId}`)
    return NextResponse.json(predictionsResponse.data)
  } catch (error) {
    logError('Error fetching predictions', error)
    return NextResponse.json(
      { error: 'Error fetching predictions' },
      { status: 500 }
    )
  }
}
