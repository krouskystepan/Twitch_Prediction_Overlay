import {
  getMockPrediction,
  setMockPrediction,
} from '@/services/mockPredictionsStore'
import { logMock } from '@/utils/logger'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const currentPrediction = getMockPrediction()

  if (!currentPrediction) {
    logMock('No mock prediction to cancel')
    return NextResponse.json(
      { message: 'No mock prediction to cancel' },
      { status: 404 }
    )
  }

  currentPrediction.status = 'CANCELED'
  currentPrediction.ended_at = new Date().toISOString()

  setMockPrediction(currentPrediction)

  logMock('Mock prediction canceled')
  return NextResponse.json({ message: 'Mock prediction canceled' })
}
