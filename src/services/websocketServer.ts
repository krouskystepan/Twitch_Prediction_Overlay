import { WebSocket, WebSocketServer } from 'ws'

import { logInfo } from '@/lib/logger'

let frontendWss: WebSocketServer | null = null
const connectedClients: WebSocket[] = []

export const initWebSocketServer = (port: number = 8080) => {
  if (frontendWss) return frontendWss

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

export const broadcastToFrontend = (data: any) => {
  const json = JSON.stringify(data)
  connectedClients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(json)
    }
  })
}
