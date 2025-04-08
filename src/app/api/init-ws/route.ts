import { NextResponse } from 'next/server'
import { initWebSocketServer } from '@/services/websocketServer'

initWebSocketServer()

export async function GET() {
  return NextResponse.json({ status: 'WebSocket initialized' })
}
