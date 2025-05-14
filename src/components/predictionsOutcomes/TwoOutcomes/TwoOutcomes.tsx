'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'

import { Prediction } from '@/types/types'
import useAnimatedValue from '@/hooks/useAnimatedValue'
import useDissapear from '@/hooks/useDissapear'
import { ChartContainer } from '@/components/ui/chart'

import OutcomeStat from './OutcomeStat'
import ResolvedStats from './ResolvedStats'
import Timer from './Timer'
import { getCorrectFillColor } from './utils'

const TwoOutcomes = ({ prediction }: { prediction: Prediction }) => {
  const { isVisible } = useDissapear({ status: prediction.status })
  const innerRadius = useAnimatedValue(
    prediction.status === 'RESOLVED' ? 66 : 80,
    0.6,
    1
  )
  const outerRadius = useAnimatedValue(
    prediction.status === 'RESOLVED' ? 85 : 130,
    0.6,
    1
  )

  const [outcomeOne, outcomeTwo] = prediction.outcomes

  const chartData = [
    {
      name: 'prediction',
      outcomeOne: {
        id: outcomeOne.id,
        channel_points: outcomeOne.channel_points,
      },
      outcomeTwo: {
        id: outcomeTwo.id,
        channel_points: outcomeTwo.channel_points,
      },
    },
  ]

  const totalPoints = outcomeOne.channel_points + outcomeTwo.channel_points

  return (
    <AnimatePresence>
      {isVisible && (
        <ChartContainer config={{}}>
          <motion.div
            className="size-full"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Title */}
            <motion.h2
              className="absolute top-2 left-0 line-clamp-1 flex w-full items-center justify-center text-xl font-semibold"
              initial={
                prediction.status === 'RESOLVED'
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -20 }
              }
              animate={
                prediction.status === 'RESOLVED'
                  ? { opacity: 0, y: -20 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                prediction.status === 'RESOLVED'
                  ? {
                      delay: 0.6,
                      duration: 0.2,
                      ease: 'linear',
                    }
                  : {
                      delay: 0.2,
                      duration: 0.4,
                      ease: 'easeOut',
                    }
              }
            >
              {prediction.title}
            </motion.h2>

            {/* Title stats*/}
            {prediction.status === 'RESOLVED' && (
              <ResolvedStats
                totalPoints={totalPoints}
                totalUsers={prediction.outcomes.reduce(
                  (acc, outcome) => acc + outcome.users,
                  0
                )}
                outcomeOneId={outcomeOne.id}
                outcomeTwoId={outcomeTwo.id}
                winningOutcomeId={prediction.winning_outcome_id!}
              />
            )}

            {/* Stats */}
            {[outcomeOne, outcomeTwo].map((outcome, index) => {
              const isLeft = index === 0
              const isWinning = prediction.winning_outcome_id === outcome.id

              return (
                <OutcomeStat
                  key={outcome.id}
                  outcome={outcome}
                  status={prediction.status}
                  winningOutcomeId={prediction.winning_outcome_id}
                  isLeft={isLeft}
                  isWinning={isWinning}
                  totalPoints={totalPoints}
                />
              )
            })}

            {/* Timer */}
            <Timer
              status={prediction.status}
              prediction_window={prediction.prediction_window}
              created_at={prediction.created_at}
            />

            {/* Chart */}
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                cy="159"
              >
                <RadialBar
                  dataKey="outcomeTwo.channel_points"
                  stackId="a"
                  animationDuration={900}
                  className={`transition-colors duration-300 ${getCorrectFillColor(
                    {
                      isLeft: false,
                      outcomeId: outcomeTwo.id,
                      winningOutcomeId: prediction.winning_outcome_id,
                    }
                  )}`}
                />
                <RadialBar
                  dataKey="outcomeOne.channel_points"
                  stackId="a"
                  animationDuration={900}
                  className={`transition-colors duration-300 ${getCorrectFillColor(
                    {
                      isLeft: true,
                      outcomeId: outcomeOne.id,
                      winningOutcomeId: prediction.winning_outcome_id,
                    }
                  )}`}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </motion.div>
        </ChartContainer>
      )}
    </AnimatePresence>
  )
}

export default TwoOutcomes
