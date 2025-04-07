import { MockPrediction } from '@/constants/types'

let currentMockPrediction: MockPrediction | null = null

export const getMockPrediction = (): MockPrediction | null =>
  currentMockPrediction

export const setMockPrediction = (prediction: MockPrediction): void => {
  currentMockPrediction = prediction
}

export const resetMockPrediction = (): void => {
  currentMockPrediction = null
}
