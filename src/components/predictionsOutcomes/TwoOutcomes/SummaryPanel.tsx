import { AnimatePresence, motion } from 'framer-motion'
import { Users } from 'lucide-react'

import { Prediction, TopPredictor } from '@/types/types'
import {
  formatNumberToReadableString,
  formatNumberWithSpaces,
} from '@/lib/utils'
import ChannelPoints from '@/components/customIcons/ChannelPoints'

// TODO: Make a animation for names to appear from the bottom

const SummaryPanel = ({ prediction }: { prediction: Prediction }) => {
  const winningPredictors = prediction.outcomes
    .filter((outcome) => outcome.id === prediction.winning_outcome_id)
    .flatMap((outcome) => outcome.top_predictors || [])

  const losingPredictors = prediction.outcomes
    .filter((outcome) => outcome.id !== prediction.winning_outcome_id)
    .flatMap((outcome) => outcome.top_predictors || [])

  const totalPoints = prediction.outcomes.reduce(
    (acc, outcome) => acc + (outcome.channel_points || 0),
    0
  )
  const totalUsers = prediction.outcomes.reduce(
    (acc, outcome) => acc + (outcome.users || 0),
    0
  )

  return (
    <motion.div
      className="bg-overlay-bar flex h-[52px] flex-col justify-between overflow-hidden rounded-md p-1"
      initial={{ height: '52px' }}
      animate={{ height: '100px' }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay: 2 }}
    >
      {/* Scrollable Names */}
      <div className="flex flex-1 gap-2 overflow-y-auto px-1">
        <NamesLayout
          title="Top Winners"
          arrToMap={winningPredictors}
          isWin={true}
        />
        <NamesLayout
          title="Top Losers"
          arrToMap={losingPredictors}
          isWin={false}
        />
      </div>

      {/* Total Stats (always pinned at the bottom) */}
      <div className="bg-overlay-prediction-stats mx-auto mt-1 flex h-5 w-64 items-center justify-center gap-2 rounded-sm text-xs font-semibold text-white">
        <span>Total Stats</span>
        <span className="flex items-center gap-1">
          <ChannelPoints size={10} />
          {formatNumberToReadableString(totalPoints)}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} />
          {totalUsers >= 100_000
            ? formatNumberToReadableString(totalUsers)
            : formatNumberWithSpaces(totalUsers)}
        </span>
      </div>
    </motion.div>
  )
}

const NamesLayout = ({
  title,
  arrToMap,
  isWin,
}: {
  title: string
  arrToMap: TopPredictor[]
  isWin: boolean
}) => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <h3 className="text-sm font-bold uppercase">{title}</h3>
      <AnimatePresence>
        <motion.div
          className="mx-auto flex w-full flex-col gap-1 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          {arrToMap.slice(0, 10).map((predictor) => (
            <p
              key={predictor.user_id}
              className="text-overlay-disabled flex justify-between text-[10px] leading-2"
            >
              {predictor.user_name}
              <span
                className={isWin ? 'text-overlay-win' : 'text-overlay-loss'}
              >
                {isWin ? '+' : '-'}
                {formatNumberToReadableString(
                  (isWin
                    ? predictor.channel_points_won
                    : predictor.channel_points_used) || 0
                )}
              </span>
            </p>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SummaryPanel
