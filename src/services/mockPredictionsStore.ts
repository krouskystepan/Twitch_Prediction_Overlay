import { Prediction } from '@/constants/types'

export let currentMockPrediction: Prediction | null = null

export const getMockPrediction = (): Prediction | null => currentMockPrediction

export const setMockPrediction = (prediction: Prediction): void => {
  currentMockPrediction = prediction
}

export const resetMockPrediction = (): void => {
  currentMockPrediction = null
}
