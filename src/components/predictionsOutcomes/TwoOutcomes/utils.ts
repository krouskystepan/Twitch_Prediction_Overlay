type GetCorrectColorOptions = {
  isLeft: boolean
  outcomeId: string
  winningOutcomeId: string | null
}

const loseColor = {
  text: 'text-neutral-600',
  fill: 'fill-neutral-600',
}

export const getCorrectTextColor = ({
  isLeft,
  outcomeId,
  winningOutcomeId,
}: GetCorrectColorOptions) => {
  const hasWinner = winningOutcomeId !== null
  const isWinning = winningOutcomeId === outcomeId

  if (hasWinner) {
    if (isWinning) {
      return isLeft ? 'text-twitch-blue' : 'text-twitch-pink'
    } else {
      return loseColor.text
    }
  }

  return isLeft ? 'text-twitch-blue' : 'text-twitch-pink'
}

export const getCorrectFillColor = ({
  isLeft,
  outcomeId,
  winningOutcomeId,
}: GetCorrectColorOptions) => {
  const hasWinner = winningOutcomeId !== null
  const isWinning = winningOutcomeId === outcomeId

  if (hasWinner) {
    if (isWinning) {
      return isLeft ? 'fill-twitch-blue' : 'fill-twitch-pink'
    } else {
      return loseColor.fill
    }
  }

  return isLeft ? 'fill-twitch-blue' : 'fill-twitch-pink'
}
