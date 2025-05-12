import { AnimatePresence, motion } from 'framer-motion'
import { Dices, Trophy, Users } from 'lucide-react'

import { Prediction } from '@/types/types'
import {
  calculateMultiplier,
  calculatePercentage,
  formatNumberToReadableString,
  formatNumberWithSpaces,
} from '@/lib/utils'
import ChannelPoints from '@/components/customIcons/ChannelPoints'

import InfoLine from './InfoLine'
import { getCorrectTextColor } from './utils'

const OutcomeStat = ({
  outcome,
  status,
  winningOutcomeId,
  isLeft,
  isWinning,
  totalPoints,
}: {
  outcome: Prediction['outcomes'][0]
  status: Prediction['status']
  winningOutcomeId: string | null
  isLeft: boolean
  isWinning: boolean
  totalPoints: number
}) => {
  const position = isLeft ? 'left-6' : 'right-6'
  const text = isLeft ? 'text-left' : 'text-right'
  const justify = isLeft ? 'justify-start' : 'justify-end'
  const items = isLeft ? 'items-start' : 'items-end'
  const trophyColor = isLeft ? 'bg-twitch-blue' : 'bg-twitch-pink'
  const resultColor = isWinning ? 'text-outcome-win' : 'text-outcome-lose'

  return (
    <motion.div
      key={outcome.id}
      className={`h-[calc(100% - 4)] absolute inset-y-2 flex w-28 flex-col ${position} ${text}`}
      initial={{
        opacity: 0,
        x: isLeft ? -20 : 20,
        y: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: status === 'RESOLVED' ? 5 : 30,
      }}
      transition={{
        opacity: { delay: 0.2, duration: 0.4, ease: 'linear' },
        x: { delay: 0.2, duration: 0.4, ease: 'linear' },
        y: { delay: 0.6, duration: 0.4, ease: 'easeIn' },
      }}
    >
      <div className={`flex items-center ${justify}`}>
        <p
          className={`text-xs font-semibold ${getCorrectTextColor({
            isLeft,
            outcomeId: outcome.id,
            winningOutcomeId,
          })}`}
        >
          {outcome.title}
        </p>
      </div>

      <div className={`flex items-center gap-2 ${justify}`}>
        {isLeft ? (
          <>
            <p
              className={`text-2xl font-bold ${getCorrectTextColor({
                isLeft,
                outcomeId: outcome.id,
                winningOutcomeId,
              })}`}
            >
              {calculatePercentage(outcome.channel_points, totalPoints)}%
            </p>
            {isWinning && (
              <span className={`${trophyColor} size-6 rounded-full p-1`}>
                <Trophy className="size-full text-white" />
              </span>
            )}
          </>
        ) : (
          <>
            {isWinning && (
              <span className={`${trophyColor} size-6 rounded-full p-1`}>
                <Trophy className="size-full text-white" />
              </span>
            )}
            <p
              className={`text-2xl font-bold ${getCorrectTextColor({
                isLeft,
                outcomeId: outcome.id,
                winningOutcomeId,
              })}`}
            >
              {calculatePercentage(outcome.channel_points, totalPoints)}%
            </p>
          </>
        )}
      </div>

      <AnimatePresence>
        {status !== 'RESOLVED' && (
          <motion.div
            className={`flex flex-col justify-center ${items}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <InfoLine
              icon={
                <Dices
                  className={getCorrectTextColor({
                    isLeft,
                    outcomeId: outcome.id,
                    winningOutcomeId,
                  })}
                  size={11}
                />
              }
              text={calculateMultiplier(outcome.channel_points, totalPoints)}
              isLeft={isLeft}
            />
            <InfoLine
              icon={
                <ChannelPoints
                  className={getCorrectTextColor({
                    isLeft,
                    outcomeId: outcome.id,
                    winningOutcomeId,
                  })}
                  size={11}
                />
              }
              text={formatNumberToReadableString(outcome.channel_points)}
              isLeft={isLeft}
            />
            <InfoLine
              icon={
                <Users
                  className={getCorrectTextColor({
                    isLeft,
                    outcomeId: outcome.id,
                    winningOutcomeId,
                  })}
                  size={11}
                />
              }
              text={formatNumberWithSpaces(outcome.users)}
              isLeft={isLeft}
            />
          </motion.div>
        )}
        {status === 'RESOLVED' && (
          <div className="mb-1.5 h-18 w-full mask-y-from-80%">
            <motion.div
              initial={{
                translateY: '50%',
              }}
              animate={{
                translateY: '-100%',
              }}
              transition={{
                translateY: { duration: 15, delay: 1, ease: 'linear' },
              }}
            >
              {[
                ...(outcome.top_predictors ?? []),
                ...Array(10 - (outcome.top_predictors?.length ?? 0)).fill(null),
              ]
                .slice(0, 10)
                ?.map((predictor) => (
                  <p
                    key={predictor.user_id}
                    className={`flex justify-between text-xs`}
                  >
                    <span
                      className={`rtl:bg-red-900 ${isLeft ? 'truncate-left order-2 ml-0.5' : 'order-1 mr-0.5 truncate'}`}
                    >
                      {predictor.user_name}
                    </span>{' '}
                    <span
                      className={`${resultColor} ${isLeft ? 'order-1' : 'order-2'}`}
                    >
                      {isWinning ? '+' : '-'}
                      {formatNumberToReadableString(
                        isWinning
                          ? predictor.channel_points_won
                          : predictor.channel_points_used
                      )}
                    </span>
                  </p>
                ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default OutcomeStat
