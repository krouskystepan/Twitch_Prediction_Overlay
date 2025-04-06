import { Request, Response } from 'express'
import { logMock } from '../utils/logger'

type TopPredictor = {
  user_id: string
  user_name: string
  user_login: string
  channel_points_used: number
  channel_points_won: number
}

type Outcome = {
  id: string
  title: string
  users: number
  channel_points: number
  top_predictors: TopPredictor[] | null
  color: 'PINK' | 'BLUE'
}

/*
- ACTIVE: The Prediction is running and viewers can make predictions.
- CANCELED: The broadcaster canceled the Prediction and refunded the Channel Points to the participants.
- LOCKED: The broadcaster locked the Prediction, which means viewers can no longer make predictions.
- RESOLVED: The winning outcome was determined and the Channel Points were distributed to the viewers who predicted the correct outcome.
*/
// TOP PREDICTORS IS NOT IN THIS MOCK - TBD
type MockPrediction = {
  id: string
  broadcaster_id: string
  broadcaster_name: string
  broadcaster_login: string
  title: string
  winning_outcome_id: string | null
  outcomes: Outcome[]
  prediction_window: number
  status: 'ACTIVE' | 'CANCELED' | 'LOCKED' | 'RESOLVED'
  created_at: string
  ended_at: string | null
  locked_at: string | null
}

let currentMockPrediction: MockPrediction | null = null

const generateOutcomes = (count: number): Outcome[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `outcome-${i + 1}`,
    title: `Option ${i + 1}`,
    users: Math.floor(Math.random() * 100),
    channel_points: Math.floor(Math.random() * 5000),
    top_predictors: null,
    color: count === 2 ? (i === 0 ? 'BLUE' : 'PINK') : 'BLUE',
  }))
}

export const getMockPrediction = (req: Request, res: Response): void => {
  if (!currentMockPrediction) {
    logMock('No mock prediction found')
    res.status(404).json({ message: 'No mock prediction found' })
    return
  }

  res.json(currentMockPrediction)
}

// The Prediction is running and viewers can make predictions.
export const createMockPrediction = (req: Request, res: Response): void => {
  const outcomesCount = parseInt(req.params.outcomesCount)
  if (isNaN(outcomesCount) || outcomesCount < 2 || outcomesCount > 10) {
    logMock('Invalid outcomes count', outcomesCount)
    res.status(400).json({ message: 'Outcomes must be between 2 and 10' })
    return
  }

  if (currentMockPrediction) {
    logMock('Mock prediction already exists')
    res.status(400).json({ message: 'Mock prediction already exists' })
    return
  }

  currentMockPrediction = {
    id: `mock-${Date.now()}`,
    broadcaster_id: '123456',
    broadcaster_name: 'MockStreamer',
    broadcaster_login: 'mockstreamer',
    title: `This is mock Prediction with ${outcomesCount} outcomes, yeah?`,
    winning_outcome_id: null,
    outcomes: generateOutcomes(outcomesCount),
    prediction_window: 60,
    status: 'ACTIVE',
    created_at: new Date().toISOString(),
    ended_at: null,
    locked_at: null,
  }

  logMock(`Mock prediction created for ${outcomesCount} outcomes`)
  res.status(201).json(currentMockPrediction)
}

// The broadcaster canceled the Prediction and refunded the Channel Points to the participants.
export const cancelMockPrediction = (req: Request, res: Response): void => {
  if (!currentMockPrediction) {
    logMock('No mock prediction to cancel')
    res.status(404).json({ message: 'No mock prediction to cancel' })
    return
  }

  currentMockPrediction.status = 'CANCELED'
  currentMockPrediction.ended_at = new Date().toISOString()

  logMock('Mock prediction canceled')
  res.json({ message: 'Mock prediction canceled' })
}

// The broadcaster locked the Prediction, which means viewers can no longer make predictions.
export const lockMockPrediction = (req: Request, res: Response): void => {
  if (!currentMockPrediction) {
    logMock('No mock prediction to lock')
    res.status(404).json({ message: 'No mock prediction to lock' })
    return
  }

  if (currentMockPrediction.status !== 'ACTIVE') {
    logMock('Mock prediction is not active')
    res.status(400).json({ message: 'Mock prediction is not active' })
    return
  }

  currentMockPrediction.status = 'LOCKED'
  currentMockPrediction.locked_at = new Date().toISOString()

  logMock('Mock prediction locked')
  res.json({ message: 'Mock prediction locked' })
}

// The winning outcome was determined and the Channel Points were distributed to the viewers who predicted the correct outcome.
export const resolveMockPrediction = (req: Request, res: Response): void => {
  if (!currentMockPrediction) {
    logMock('No mock prediction to resolve')
    res.status(404).json({ message: 'No mock prediction to resolve' })
    return
  }

  if (currentMockPrediction.status !== 'LOCKED') {
    logMock('Mock prediction is not locked')
    res.status(400).json({ message: 'Mock prediction is not locked' })
    return
  }

  const winningOutcome =
    currentMockPrediction.outcomes[
      Math.floor(Math.random() * currentMockPrediction.outcomes.length)
    ]

  currentMockPrediction.status = 'RESOLVED'
  currentMockPrediction.ended_at = new Date().toISOString()
  currentMockPrediction.winning_outcome_id = winningOutcome.id

  currentMockPrediction.outcomes = currentMockPrediction.outcomes.map(
    (outcome) => ({
      ...outcome,
      users:
        outcome.id === winningOutcome.id ? Math.floor(Math.random() * 100) : 0,
      channel_points:
        outcome.id === winningOutcome.id ? Math.floor(Math.random() * 5000) : 0,
    })
  )

  logMock('Mock prediction resolved', winningOutcome)
  res.json({
    message: 'Mock prediction resolved',
    winningOutcome,
  })
}

// Only for development purposes
export const resetMockPredictions = (req: Request, res: Response): void => {
  currentMockPrediction = null
  logMock('Mock prediction reset')
  res.json({ message: 'Mock prediction reset' })
}
