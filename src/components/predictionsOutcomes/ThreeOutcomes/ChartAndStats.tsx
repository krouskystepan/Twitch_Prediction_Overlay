'use client'

import { useEffect, useState } from 'react'
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

const ChartAndStats = ({
  prediction,
  isVisibleFromState,
}: {
  prediction: Prediction
  isVisibleFromState: boolean
}) => {
  const [hideLosers, setHideLosers] = useState(false)

  useEffect(() => {
    if (prediction.status === 'resolved') {
      const timeout = setTimeout(() => {
        setHideLosers(true)
      }, 2000) // 2 seconds
      return () => clearTimeout(timeout)
    }
  }, [prediction.status])

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
                  className="bg-overlay-bar flex h-[1.8125rem] w-full items-center gap-1.5 rounded-md px-1.5"
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
                  </div>

                  <div className="relative h-full w-[11.5rem]">
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
                      <p className="absolute top-1/2 left-1 -translate-y-1/2 text-left text-[1rem] font-bold text-white">
                        {calculatePercentage(
                          outcome.channel_points || 0,
                          totalChannelPoints
                        )}
                        %
                      </p>
                      {prediction.status === 'resolved' && isWinner && (
                        <motion.div
                          className="absolute top-1/2 right-1 flex size-4.5 -translate-y-1/2 items-center justify-center rounded-full bg-white"
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
                            size={12}
                            color={`var(--ovr-chart-${outcome.color}-light`}
                            strokeWidth={2.5}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-nowrap items-center w-18 justify-start gap-1 ml-0.5" style={{ color: `var(--ovr-${outcome.color})`}}>
                    <Dices size={16} />
                    <p className="text-xs font-medium text-nowrap text-white">
                      {calculateMultiplier(outcome.channel_points || 0, totalChannelPoints)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
      </AnimatePresence>
    </motion.section>
  )
}

export default ChartAndStats
