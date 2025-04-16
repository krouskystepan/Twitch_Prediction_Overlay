'use client'

import { useEffect, useRef, useState } from 'react'
import { useMockPrediction } from '@/contexts/MockPredictionContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Dices, Users } from 'lucide-react'
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'

import { Prediction } from '@/types/types'
import {
  calculateMultiplier,
  calculatePercentage,
  calculateSecondsFromDate,
  formatNumberToReadableString,
  formatNumberWithSpaces,
  getStatusText,
} from '@/lib/utils'
import useDissapear from '@/hooks/useDissapear'
import { ChartContainer } from '@/components/ui/chart'

import ChannelPoints from '../customIcons/ChannelPoints'

const TwoOutcomes = ({ prediction }: { prediction: Prediction }) => {
  const { isVisible } = useDissapear({ status: prediction.status })

  const [outcomeOne, outcomeTwo] = prediction.outcomes

  const chartData = [
    {
      name: 'prediction',
      outcomeOne: outcomeOne.channel_points,
      outcomeTwo: outcomeTwo.channel_points,
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
            <motion.div
              className="absolute top-3 left-0 flex w-full items-center justify-center text-xl font-semibold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
              {prediction.title}
            </motion.div>

            {/* Stats */}
            {[outcomeOne, outcomeTwo].map((outcome, index) => (
              <motion.div
                key={outcome.id}
                className={`absolute bottom-3 flex h-28 w-28 flex-col justify-between ${index === 0 ? 'left-6 text-left' : 'right-6 text-right'}`}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
              >
                <div
                  className={`mt-2 flex size-full items-center ${index === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <p
                    className={`text-xs font-semibold ${index === 0 ? 'text-twitch-blue text-left' : 'text-twitch-pink text-right'}`}
                  >
                    {outcome.title}
                  </p>
                </div>

                <div
                  className={`flex flex-col ${index === 0 ? 'items-start' : 'items-end'}`}
                >
                  <p
                    className={`text-xl font-bold ${index === 0 ? 'text-twitch-blue' : 'text-twitch-pink'}`}
                  >
                    {calculatePercentage(outcome.channel_points, totalPoints)}%
                  </p>
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500">
                    {index === 0 ? (
                      <>
                        <Dices className="text-twitch-blue" size={11} />
                        {calculateMultiplier(
                          outcome.channel_points,
                          totalPoints
                        )}
                      </>
                    ) : (
                      <>
                        {calculateMultiplier(
                          outcome.channel_points,
                          totalPoints
                        )}
                        <Dices className="text-twitch-pink" size={11} />
                      </>
                    )}
                  </p>
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500">
                    {index === 0 ? (
                      <>
                        <ChannelPoints className="text-twitch-blue" size={11} />
                        {formatNumberToReadableString(outcome.channel_points)}
                      </>
                    ) : (
                      <>
                        {formatNumberToReadableString(outcome.channel_points)}
                        <ChannelPoints className="text-twitch-pink" size={11} />
                      </>
                    )}
                  </p>
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500">
                    {index === 0 ? (
                      <>
                        <Users className="text-twitch-blue" size={11} />
                        {formatNumberWithSpaces(outcome.users)}
                      </>
                    ) : (
                      <>
                        {formatNumberWithSpaces(outcome.users)}
                        <Users className="text-twitch-pink" size={11} />
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}

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
                innerRadius={80}
                outerRadius={130}
                cy="159"
              >
                <RadialBar
                  dataKey="outcomeTwo"
                  stackId="a"
                  fill="var(--twitch-pink)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="outcomeOne"
                  stackId="a"
                  fill="var(--twitch-blue)"
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </motion.div>
        </ChartContainer>
      )}
    </AnimatePresence>
  )
}

const Timer = ({
  status,
  prediction_window,
  created_at,
}: {
  status: Prediction['status']
  prediction_window: Prediction['prediction_window']
  created_at: Prediction['created_at']
}) => {
  const [timer, setTimer] = useState({
    secondsLeft: calculateSecondsFromDate(created_at, prediction_window),
    percent: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === 'LOCKED') {
        setTimer({
          secondsLeft: 0,
          percent: 100,
        })
        return
      }

      if (status !== 'ACTIVE') return

      const createdAt = new Date(created_at).getTime()
      const now = Date.now()
      const totalMs = prediction_window * 1000
      const elapsedMs = now - createdAt
      const secondsLeft = Math.max(Math.ceil((totalMs - elapsedMs) / 1000), 0)
      const possiblePercent = Math.round((elapsedMs / totalMs) * 100)
      const percent = Math.min(possiblePercent, 100)

      setTimer({
        secondsLeft,
        percent,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [created_at, prediction_window, status])

  return (
    <section className="absolute -bottom-14 left-1/2 size-28 -translate-x-1/2 rounded-full">
      <motion.div
        className="absolute -top-6 left-0 flex h-full w-full items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-sm font-bold text-black">
          {getStatusText(status, timer.secondsLeft)}
        </p>
      </motion.div>
      {timer.percent ? (
        <motion.div
          className="h-1/2 w-full origin-bottom rounded-t-full border-3 border-b-0 border-neutral-200"
          initial={{
            opacity: 0,
            rotate: -180,
          }}
          animate={{
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            rotate: {
              duration: prediction_window,
              ease: 'linear',
            },
            opacity: { duration: 0.6 },
          }}
        />
      ) : null}
    </section>
  )
}

export default TwoOutcomes
