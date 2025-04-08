import WebSocket from 'ws'
import axios from 'axios'
import { logError, logInfo, logSuccess, logWarn } from '../utils/logger'
import { broadcastToFrontend } from './websocketServer'

const TWITCH_WS_URL = 'wss://eventsub.wss.twitch.tv/ws'

const eventTypes = [
  'channel.prediction.begin',
  'channel.prediction.lock',
  'channel.prediction.end',
]

export const startEventSubSession = (
  token: string,
  broadcasterId: string,
  wsUrl: string = TWITCH_WS_URL
) => {
  const ws = new WebSocket(wsUrl)
  const clientId = process.env.TWITCH_CLIENT_ID!
  let keepAliveCount = 0

  ws.on('open', () => {
    logSuccess('WebSocket connection opened')
  })

  ws.on('message', async (data) => {
    const msg = JSON.parse(data.toString())

    switch (msg.metadata?.message_type) {
      case 'session_welcome': {
        const sessionId = msg.payload.session.id
        logInfo('Session ID:', sessionId)

        for (const type of eventTypes) {
          try {
            await axios.post(
              'https://api.twitch.tv/helix/eventsub/subscriptions',
              {
                type,
                version: '1',
                condition: { broadcaster_user_id: broadcasterId },
                transport: {
                  method: 'websocket',
                  session_id: sessionId,
                },
              },
              {
                headers: {
                  'Client-ID': clientId,
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            logSuccess(`Subscribed to ${type}`)
          } catch (error) {
            logError(`Error subscribing to ${type}:`, error)
          }
        }
        break
      }

      case 'session_keepalive': {
        keepAliveCount++
        if (keepAliveCount % 30 === 0) {
          logInfo('Keepalive received from Twitch.')
        }
        break
      }

      case 'session_reconnect': {
        const reconnectUrl = msg.payload.session.reconnect_url
        logWarn('Twitch requested reconnect. Reconnecting to:', reconnectUrl)

        ws.close()
        startEventSubSession(token, broadcasterId, reconnectUrl)
        break
      }

      case 'notification': {
        const { subscription_type } = msg.metadata
        const { event } = msg.payload

        broadcastToFrontend({ type: subscription_type, event })

        switch (subscription_type) {
          case 'channel.prediction.begin':
            logInfo('Prediction started:', event.title)
            break
          case 'channel.prediction.lock':
            logInfo('Prediction locked:', event.title)
            break
          case 'channel.prediction.end':
            logInfo('Prediction ended:', event.title)
            break
          default:
            logWarn('Unknown prediction type:', subscription_type)
            break
        }
        break
      }

      default:
        logWarn('Unhandled message type:', msg.metadata?.message_type)
    }
  })

  ws.on('close', () => {
    logWarn('WebSocket connection closed.')
  })

  ws.on('error', (err) => {
    logError('WebSocket connection error.', err)
  })

  process.on('SIGINT', () => {
    logWarn('Shutting down gracefully...')
    ws.close()
    process.exit(0)
  })
}
