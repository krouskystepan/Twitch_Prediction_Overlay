'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Dices, Trophy, Users } from 'lucide-react'

import { Prediction } from '@/types/types'
import {
  calculateMultiplier,
  calculatePercentage,
  formatNumberToReadableString,
  formatNumberWithSpaces,
} from '@/lib/utils'
import useHideLosers from '@/hooks/useHideLosers'
import ChannelPoints from '@/components/customIcons/ChannelPoints'

const ChartAndStats = ({
  prediction,
  isVisibleFromState,
}: {
  prediction: Prediction
  isVisibleFromState: boolean
}) => {
  const hideLosers = useHideLosers({
    status: prediction.status,
  })

  const totalChannelPoints = prediction.outcomes.reduce(
    (acc, outcome) => acc + (outcome.channel_points || 0),
    0
  )

  return (
    <motion.section
      className="flex h-auto w-full flex-col justify-end gap-1"
      layout
    >
      <AnimatePresence>
        {isVisibleFromState &&
          prediction.outcomes
            .filter((outcome) => {
              const isWinner = 'outcome-2' === outcome.id
              return prediction.status !== 'resolved' || isWinner || !hideLosers
            })
            .map((outcome, index) => {
              const isWinner = 'outcome-2' === outcome.id

              return (
                <motion.div
                  key={outcome.id}
                  className="bg-overlay-bar flex h-11 w-full items-center gap-1.5 rounded-md px-1.5"
                  layout
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: 'brightness(1)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter:
                      prediction.status === 'resolved' && !isWinner
                        ? 'brightness(0.6)'
                        : 'brightness(1)',
                  }}
                  transition={{
                    opacity: {
                      delay: (prediction.outcomes.length - 1 - index) * 0.05,
                      duration: 0.2,
                      ease: 'easeInOut',
                    },
                    y: {
                      delay: (prediction.outcomes.length - 1 - index) * 0.05,
                      duration: 0.2,
                      ease: 'easeInOut',
                    },
                    filter: {
                      delay: 0.4,
                      duration: 0.2,
                      ease: 'easeInOut',
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.2,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <div className="w-1/2 space-y-0.5">
                    <p
                      className="text-xs !leading-none font-bold"
                      style={{
                        color: `var(--ovr-${outcome.color})`,
                      }}
                    >
                      {outcome.title}
                    </p>
                    <div className="grid h-4.5 grid-cols-3 gap-1">
                      {[
                        {
                          icon: <Dices size={16} />,
                          content: calculateMultiplier(
                            outcome.channel_points || 0,
                            totalChannelPoints
                          ),
                        },
                        {
                          icon: <ChannelPoints size={14} />,
                          content: formatNumberToReadableString(
                            outcome.channel_points || 0
                          ),
                        },
                        {
                          icon: <Users size={16} />,
                          content:
                            (outcome.users || 0) >= 100_000
                              ? formatNumberToReadableString(outcome.users || 0)
                              : formatNumberWithSpaces(outcome.users || 0),
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-nowrap items-center justify-start gap-1 first:ml-0.5"
                          style={{
                            color: `var(--ovr-${outcome.color})`,
                          }}
                        >
                          {item.icon}
                          <p className="text-xs font-medium text-nowrap text-white">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative h-full w-1/2">
                    <div
                      className="absolute inset-x-0 inset-y-1.25 overflow-hidden rounded-sm"
                      style={{
                        backgroundColor: `var(--ovr-chart-${outcome.color}-dark)`,
                      }}
                    >
                      <div
                        className="absolute inset-0 transition-[width] duration-500 ease-in-out"
                        style={{
                          width: `${calculatePercentage(
                            outcome.channel_points || 0,
                            totalChannelPoints
                          )}%`,
                          backgroundColor: `var(--ovr-chart-${outcome.color}-light)`,
                        }}
                      />
                      <p className="absolute top-1/2 left-1 -translate-y-1/2 text-left text-xl font-bold text-white">
                        {calculatePercentage(
                          outcome.channel_points || 0,
                          totalChannelPoints
                        )}
                        %
                      </p>
                      {prediction.status === 'resolved' && isWinner && (
                        <motion.div
                          className="absolute top-1/2 right-1 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              delay: 0.5,
                            },
                          }}
                        >
                          <Trophy
                            size={14}
                            color={`var(--ovr-chart-${outcome.color}-light`}
                            strokeWidth={2.5}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
      </AnimatePresence>
    </motion.section>
  )
}

export default ChartAndStats
