import { NextRequest, NextResponse } from 'next/server'
import { Prediction } from '@/constants/types'
import {
  getMockPrediction,
  setMockPrediction,
} from '@/services/mockPredictionsStore'
import { logMock } from '@/utils/logger'
import { generateOutcomes } from '@/utils/mockPredictionUtils'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { outcomeCount } = body

  if (!outcomeCount || outcomeCount < 2 || outcomeCount > 10) {
    logMock('Invalid outcomes count', outcomeCount)
    return NextResponse.json(
      { message: 'Outcomes must be between 2 and 10' },
      { status: 400 }
    )
  }

  if (getMockPrediction()) {
    logMock('Mock prediction already exists')
    return NextResponse.json(
      { message: 'Mock prediction already exists' },
      { status: 400 }
    )
  }

  const newPrediction: Prediction = {
    id: `mock-${Date.now()}`,
    broadcaster_id: '123456',
    broadcaster_name: 'MockStreamer',
    broadcaster_login: 'mockstreamer',
    title: `This is mock Prediction with ${outcomeCount} outcomes`,
    winning_outcome_id: null,
    outcomes: generateOutcomes(outcomeCount),
    prediction_window: 60,
    status: 'ACTIVE',
    created_at: new Date().toISOString(),
    ended_at: null,
    locked_at: null,
  }

  setMockPrediction(newPrediction)

  logMock(`Mock prediction created for ${outcomeCount} outcomes`)
  return NextResponse.json(newPrediction, { status: 201 })
}
