import { AnimatePresence, motion } from 'framer-motion'
import { Users } from 'lucide-react'

import { Prediction, TopPredictor } from '@/types/types'
import {
  formatNumberToReadableString,
  formatNumberWithSpaces,
} from '@/lib/utils'
import ChannelPoints from '@/components/customIcons/ChannelPoints'

const SummaryPanel = ({
  prediction,
  animations: { finalHeight, names },
}: {
  prediction: Prediction
  animations: {
    finalHeight: number
    names: {
      initialOffset: number
      finalOffset: number
    }
  }
}) => {
  const winningPredictors = prediction.outcomes
    .filter((outcome) => outcome.id === prediction.winning_outcome_id)
    .flatMap((outcome) => outcome.top_predictors || [])
    .sort((a, b) => (a.channel_points_won ?? 0) - (b.channel_points_won ?? 0))

  const losingPredictors = prediction.outcomes
    .filter((outcome) => outcome.id !== prediction.winning_outcome_id)
    .flatMap((outcome) => outcome.top_predictors || [])
    .sort((a, b) => (a.channel_points_used ?? 0) - (b.channel_points_used ?? 0))

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
      className="bg-overlay-bar relative flex flex-col justify-between overflow-hidden rounded-md p-1"
      initial={{ height: '52px' }}
      animate={{ height: `${finalHeight}px` }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay: 2.3 }}
    >
      {/* Scrollable Names */}
      <div className="flex h-12 flex-1 gap-2 overflow-y-hidden px-1">
        <NamesLayout
          title="Top Winners"
          arrToMap={winningPredictors}
          isWin={true}
          namesAnimation={names}
        />
        <NamesLayout
          title="Top Losers"
          arrToMap={losingPredictors}
          isWin={false}
          namesAnimation={names}
        />
      </div>

      <div className="bg-overlay-stats mx-auto mt-1 flex h-5 w-56 items-center justify-center gap-2 rounded-sm text-xs font-semibold text-white">
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
  namesAnimation: { initialOffset, finalOffset },
}: {
  title: string
  arrToMap: TopPredictor[]
  isWin: boolean
  namesAnimation: {
    initialOffset: number
    finalOffset: number
  }
}) => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <h3 className="text-sm font-bold uppercase">{title}</h3>
      <AnimatePresence>
        <motion.div
          className="z-50 flex w-full flex-col mask-t-from-70%"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          {arrToMap.slice(0, 10).map((predictor) => (
            <motion.p
              key={predictor.user_id}
              className="odd:bg-overlay-stats-names text-overlay-disabled flex justify-between rounded-sm p-1 text-xs leading-2"
              initial={{
                translateY: `${initialOffset}px`,
              }}
              animate={{
                translateY: `${finalOffset}px`,
              }}
              transition={{
                duration: 15,
                ease: 'linear',
              }}
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
            </motion.p>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SummaryPanel
