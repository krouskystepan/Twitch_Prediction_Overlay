import { WebSocket, WebSocketServer } from 'ws'

import { logInfo } from '@/lib/logger'

let frontendWss: WebSocketServer | null = null
const connectedClients: WebSocket[] = []

export const initWebSocketServer = (port: number = 8080) => {
  if (frontendWss) return frontendWss

  // TODO: Fix when multiple devices are connected it will throw an error
  /* 
  uncaughtException:  Error: listen EADDRINUSE: address already in use :::8080
    at <unknown> (Error: listen EADDRINUSE: address already in use :::8080)
    at initWebSocketServer (src/services/websocketServer.ts:11:16)
    at OverlayLayout (src/app/predictions/[channelName]/overlay/layout.tsx:25:20)
   9 |   if (frontendWss) return frontendWss
  10 |
> 11 |   frontendWss = new WebSocketServer({ port })
     |                ^
  12 |
  13 |   frontendWss.on('connection', (socket) => {
  14 |     connectedClients.push(socket) {
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '::',
  port: 8080
}
  */
  frontendWss = new WebSocketServer({ port })

  frontendWss.on('connection', (socket) => {
    connectedClients.push(socket)
    logInfo('Frontend connected via WebSocket')

    socket.on('close', () => {
      const index = connectedClients.indexOf(socket)
      if (index !== -1) connectedClients.splice(index, 1)
    })
  })

  logInfo(`WebSocket server started on port`, port)
  return frontendWss
}

export const broadcastToFrontend = (data: unknown) => {
  const json = JSON.stringify(data)
  connectedClients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(json)
    }
  })
}
