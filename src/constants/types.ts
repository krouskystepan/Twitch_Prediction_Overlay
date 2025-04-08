export type TopPredictor = {
  user_id: string
  user_name: string
  user_login: string
  channel_points_used: number
  channel_points_won: number
}

export type Outcome = {
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
export type Prediction = {
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
