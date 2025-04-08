import { NextRequest, NextResponse } from 'next/server'
import {
  getMockPrediction,
  setMockPrediction,
} from '@/services/mockPredictionsStore'
import { logMock } from '@/utils/logger'

export async function POST(req: NextRequest) {
  const currentPrediction = getMockPrediction()

  if (!currentPrediction) {
    logMock('No mock prediction to lock')
    return NextResponse.json(
      { message: 'No mock prediction to lock' },
      { status: 404 }
    )
  }

  if (currentPrediction.status !== 'ACTIVE') {
    logMock('Mock prediction is not active')
    return NextResponse.json(
      { message: 'Mock prediction is not active' },
      { status: 400 }
    )
  }

  currentPrediction.status = 'LOCKED'
  currentPrediction.locked_at = new Date().toISOString()

  setMockPrediction(currentPrediction)

  logMock('Mock prediction locked')
  return NextResponse.json({ message: 'Mock prediction locked' })
}
