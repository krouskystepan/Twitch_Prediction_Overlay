export type TopPredictor = {
  user_id: string
  user_name: string
  user_login: string
  channel_points_used: number
  channel_points_won: number | null
}

export type Outcome = {
  id: string
  title: string
  color: 'pink' | 'blue'
  users?: number
  channel_points?: number
  top_predictors?: TopPredictor[] | []
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
  outcomes: Outcome[]
  winning_outcome_id?: string
  started_at: string
  status?: 'resolved' | 'canceled'
  locks_at?: string
  locked_at?: string
  ended_at?: string
}
