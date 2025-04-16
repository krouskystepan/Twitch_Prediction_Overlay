import { Outcome, TopPredictor } from '@/types/types'

export const generateOutcomes = (
  count: number,
  magnitude: number
): Outcome[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `outcome-${i + 1}`,
    title: `This is outcome number ${i + 1} of ${count}`,
    users: Math.floor(Math.random() * 1_000 * magnitude),
    channel_points: Math.floor(Math.random() * 50_000 * magnitude),
    top_predictors: null,
    color: count === 2 ? (i === 0 ? 'BLUE' : 'PINK') : 'BLUE',
  }))
}

export const generateTopPredictors = (
  count: number,
  isWin = false
): TopPredictor[] => {
  return Array.from({ length: count }, () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000

    return {
      user_id: `user-${randomNum}`,
      user_name: `User${randomNum}`,
      user_login: `user${randomNum}`,
      channel_points_used: Math.floor(Math.random() * 5000) + 100,
      channel_points_won: isWin ? Math.floor(Math.random() * 5000) : 0,
    }
  })
}
