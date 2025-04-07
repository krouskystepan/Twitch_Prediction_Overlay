import {
  getMockPrediction,
  setMockPrediction,
} from '@/services/mockPredictionsStore'
import { logMock } from '@/utils/logger'
import { generateTopPredictors } from '@/utils/mockPredictionUtils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const currentPrediction = getMockPrediction()

  if (!currentPrediction) {
    logMock('No mock prediction to resolve')
    return NextResponse.json(
      { message: 'No mock prediction to resolve' },
      { status: 404 }
    )
  }

  if (currentPrediction.status !== 'LOCKED') {
    logMock('Mock prediction is not locked')
    return NextResponse.json(
      { message: 'Mock prediction is not locked' },
      { status: 400 }
    )
  }

  const winningOutcome =
    currentPrediction.outcomes[
      Math.floor(Math.random() * currentPrediction.outcomes.length)
    ]

  currentPrediction.status = 'RESOLVED'
  currentPrediction.ended_at = new Date().toISOString()
  currentPrediction.winning_outcome_id = winningOutcome.id

  currentPrediction.outcomes = currentPrediction.outcomes.map((outcome) => ({
    ...outcome,
    top_predictors:
      outcome.id === winningOutcome.id
        ? generateTopPredictors(10, true)
        : generateTopPredictors(10),
  }))

  setMockPrediction(currentPrediction)

  logMock('Mock prediction resolved')
  return NextResponse.json({ message: 'Mock prediction resolved' })
}
