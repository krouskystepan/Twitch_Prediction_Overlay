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

const nicknames = [
  'Blaze',
  'Shadow',
  'Nova',
  'Ace',
  'Zephyr',
  'Frost',
  'Echo',
  'Dash',
  'Jinx',
  'Rogue',
  'Pixel',
  'Storm',
  'Ghost',
  'Viper',
  'Drift',
  'Snare',
  'Zane',
  'Flare',
  'Glitch',
  'Onyx',
  'Rex',
  'Spook',
  'Knox',
  'Talon',
  'Wraith',
]

const getRandomNickname = (): string => {
  const base = nicknames[Math.floor(Math.random() * nicknames.length)]
  const suffixOptions = [
    '',
    Math.floor(Math.random() * 1000).toString(),
    '_' + Math.floor(Math.random() * 100).toString(),
    '_' + String.fromCharCode(97 + Math.floor(Math.random() * 26)),
  ]

  let nickname =
    base + suffixOptions[Math.floor(Math.random() * suffixOptions.length)]

  if (nickname.length < 4) {
    nickname += Math.floor(Math.random() * 9000 + 1000)
  } else if (nickname.length > 25) {
    nickname = nickname.slice(0, 25)
  }

  return nickname
}

export const generateTopPredictors = (
  count: number,
  isWin = false
): TopPredictor[] => {
  return Array.from({ length: count }, () => {
    const nickname = getRandomNickname()

    return {
      user_id: `user-${Math.floor(Math.random() * 1e6)}`,
      user_name: nickname,
      user_login: nickname.toLowerCase().replace(/\s/g, ''),
      channel_points_used: Math.floor(Math.random() * 5000) + 100,
      channel_points_won: isWin ? Math.floor(Math.random() * 5000) : 0,
    }
  })
}
