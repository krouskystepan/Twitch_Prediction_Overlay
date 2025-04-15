'use client'

import React, { createContext, useContext, useState } from 'react'

import { Prediction } from '@/types/types'
import { logMock } from '@/lib/logger'
import {
  generateOutcomes,
  generateTopPredictors,
} from '@/lib/mockPredictionUtils'

type MockPredictionContextType = {
  prediction: Prediction | null
  createPrediction: (outcomeCount: number, time: number) => void
  cancelPrediction: () => void
  lockPrediction: () => void
  resolvePrediction: () => void
  resetPrediction: () => void
}

const MockPredictionContext = createContext<
  MockPredictionContextType | undefined
>(undefined)

export const MockPredictionProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  const createPrediction = (outcomeCount: number, time: number) => {
    if (prediction) {
      logMock('Prediction already exists, please reset it first')
      throw new Error('Prediction already exists, please reset it first')
    }

    if (outcomeCount < 2 || outcomeCount > 10) {
      logMock('Outcome count must be between 2 and 10')
      throw new Error('Outcome count must be between 2 and 10')
    }

    const newPrediction: Prediction = {
      id: `mock-${Date.now()}`,
      broadcaster_id: '123456',
      broadcaster_name: 'MockStreamer',
      broadcaster_login: 'mockstreamer',
      title: `This is mock Prediction with ${outcomeCount} outcomes`,
      winning_outcome_id: null,
      outcomes: generateOutcomes(outcomeCount),
      prediction_window: time,
      status: 'ACTIVE',
      created_at: new Date().toISOString(),
      ended_at: null,
      locked_at: null,
    }

    logMock('Creating new prediction')
    setPrediction(newPrediction)
  }

  const cancelPrediction = () => {
    if (!prediction) {
      logMock('No prediction to cancel')
      throw new Error('No prediction to cancel')
    }

    if (prediction.status !== 'ACTIVE') {
      logMock('Prediction is not active')
      throw new Error('Prediction is not active')
    }

    logMock('Canceling prediction')
    setPrediction({
      ...prediction,
      status: 'CANCELED',
      ended_at: new Date().toISOString(),
    })
  }

  const lockPrediction = () => {
    if (!prediction) {
      logMock('No prediction to lock')
      throw new Error('No prediction to lock')
    }

    if (prediction.status !== 'ACTIVE') {
      logMock('Prediction is not active')
      throw new Error('Prediction is not active')
    }

    logMock('Locking prediction')
    setPrediction({
      ...prediction,
      status: 'LOCKED',
      locked_at: new Date().toISOString(),
    })
  }

  const resolvePrediction = () => {
    if (!prediction) {
      logMock('No prediction to resolve')
      throw new Error('No prediction to resolve')
    }

    if (prediction.status !== 'LOCKED') {
      logMock('Prediction is not locked')
      throw new Error('Prediction is not locked')
    }

    const winning =
      prediction.outcomes[
        Math.floor(Math.random() * prediction.outcomes.length)
      ]

    const updatedOutcomes = prediction.outcomes.map((o) => ({
      ...o,
      top_predictors:
        o.id === winning.id
          ? generateTopPredictors(10, true)
          : generateTopPredictors(10, false),
    }))

    logMock('Resolving prediction')
    setPrediction({
      ...prediction,
      status: 'RESOLVED',
      ended_at: new Date().toISOString(),
      winning_outcome_id: winning.id,
      outcomes: updatedOutcomes,
    })
  }

  const resetPrediction = () => {
    if (!prediction) {
      logMock('No prediction to reset')
      throw new Error('No prediction to reset')
    }

    logMock('Resetting prediction')
    setPrediction(null)
  }

  return (
    <MockPredictionContext.Provider
      value={{
        prediction,
        createPrediction,
        cancelPrediction,
        lockPrediction,
        resolvePrediction,
        resetPrediction,
      }}
    >
      {children}
    </MockPredictionContext.Provider>
  )
}

export const useMockPrediction = () => {
  const context = useContext(MockPredictionContext)
  if (!context)
    throw new Error(
      'useMockPrediction must be used within a MockPredictionProvider'
    )
  return context
}
