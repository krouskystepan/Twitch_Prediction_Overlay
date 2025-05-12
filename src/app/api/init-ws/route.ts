import { NextResponse } from 'next/server'

// import { initWebSocketServer } from '@/services/websocketServer'

export async function GET() {
  return NextResponse.json({ status: 'WebSocket initialized' })
}
