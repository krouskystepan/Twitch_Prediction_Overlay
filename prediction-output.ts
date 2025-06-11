/* eslint-disable @typescript-eslint/no-unused-vars */
// https://dev.twitch.tv/docs/api/reference/#get-predictions

// START
const START = {
  id: 'd2d1b1c1-81c0-40b9-85a7-c777aab00c11',
  broadcaster_user_id: '420050146',
  broadcaster_user_name: 'myskocz',
  broadcaster_user_login: 'myskocz',
  title: 'Vyhraje pristi hru?',
  outcomes: [
    {
      id: '99d3dbbe-62c9-4d05-be47-ed820d8e4ff9',
      title: 'yo',
      color: 'blue',
    },
    {
      id: 'c0375d9c-bef1-4536-a47b-8463a0b48a58',
      title: 'ne',
      color: 'pink',
    },
  ],
  started_at: '2025-05-14T23:11:40.814564584Z',
  locks_at: '2025-05-14T23:16:40.814564584Z',
}

// PROGRESS
const PROGRESS = {
  id: 'd2d1b1c1-81c0-40b9-85a7-c777aab00c11',
  broadcaster_user_id: '420050146',
  broadcaster_user_name: 'myskocz',
  broadcaster_user_login: 'myskocz',
  title: 'Vyhraje pristi hru?',
  outcomes: [
    {
      id: '99d3dbbe-62c9-4d05-be47-ed820d8e4ff9',
      title: 'yo',
      color: 'blue',
      users: 0,
      channel_points: 0,
      top_predictors: [],
    },
    {
      id: 'c0375d9c-bef1-4536-a47b-8463a0b48a58',
      title: 'ne',
      color: 'pink',
      users: 1,
      channel_points: 1000,
      top_predictors: [
        {
          user_id: '183964031',
          user_login: 'd4rzk',
          user_name: 'D4rzk',
          channel_points_used: 1000,
          channel_points_won: null,
        },
      ],
    },
  ],
  started_at: '2025-05-14T23:11:40.814564584Z',
  locks_at: '2025-05-14T23:16:40.814564584Z',
}

// LOCKED
const LOCKED = {
  id: 'd2d1b1c1-81c0-40b9-85a7-c777aab00c11',
  broadcaster_user_id: '420050146',
  broadcaster_user_name: 'myskocz',
  broadcaster_user_login: 'myskocz',
  title: 'Vyhraje pristi hru?',
  outcomes: [
    {
      id: '99d3dbbe-62c9-4d05-be47-ed820d8e4ff9',
      title: 'yo',
      color: 'blue',
      users: 0,
      channel_points: 0,
      top_predictors: [],
    },
    {
      id: 'c0375d9c-bef1-4536-a47b-8463a0b48a58',
      title: 'ne',
      color: 'pink',
      users: 1,
      channel_points: 1000,
      top_predictors: [
        {
          user_id: '183964031',
          user_login: 'd4rzk',
          user_name: 'D4rzk',
          channel_points_used: 1000,
          channel_points_won: null,
        },
      ],
    },
  ],
  started_at: '2025-05-14T23:11:40.814564584Z',
  locked_at: '2025-05-14T23:14:22.141301695Z',
}

// RESOLVED
const RESOLVED = {
  id: 'd2d1b1c1-81c0-40b9-85a7-c777aab00c11',
  broadcaster_user_id: '420050146',
  broadcaster_user_name: 'myskocz',
  broadcaster_user_login: 'myskocz',
  title: 'Vyhraje pristi hru?',
  outcomes: [
    {
      id: '99d3dbbe-62c9-4d05-be47-ed820d8e4ff9',
      title: 'yo',
      color: 'blue',
      users: 0,
      channel_points: 0,
      top_predictors: [],
    },
    {
      id: 'c0375d9c-bef1-4536-a47b-8463a0b48a58',
      title: 'ne',
      color: 'pink',
      users: 1,
      channel_points: 1000,
      top_predictors: [
        {
          user_id: '183964031',
          user_login: 'd4rzk',
          user_name: 'D4rzk',
          channel_points_used: 1000,
          channel_points_won: 1000,
        },
      ],
    },
  ],
  winning_outcome_id: 'c0375d9c-bef1-4536-a47b-8463a0b48a58',
  status: 'resolved',
  started_at: '2025-05-14T23:11:40.814564584Z',
  ended_at: '2025-05-14T23:14:44.623363413Z',
}

// CANCELLED
const CANCELLED = {
  id: '3c64e55f-2266-4525-8040-970ca02bee7e',
  broadcaster_user_id: '420050146',
  broadcaster_user_name: 'myskocz',
  broadcaster_user_login: 'myskocz',
  title: 'Vyhraje pristi hru?',
  outcomes: [
    {
      id: '6e1fb73a-14d6-4565-8b25-0942080b8258',
      title: 'yo',
      color: 'blue',
      users: 0,
      channel_points: 0,
      top_predictors: [],
    },
    {
      id: '2bbdd1d3-1084-4a1d-bf1e-039b48ce268d',
      title: 'ne',
      color: 'pink',
      users: 0,
      channel_points: 0,
      top_predictors: [],
    },
  ],
  winning_outcome_id: '',
  status: 'canceled',
  started_at: '2025-05-14T23:16:03.355772722Z',
  ended_at: '2025-05-14T23:16:06.376416278Z',
}
