import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Prediction } from '@/types/types'
import useDisappear from '@/hooks/useDissapear'

import HeaderAndTimer from '../shared/HeaderAndTimer'
import SummaryPanel from '../shared/SummaryPanel'
import ChartAndStats from './ChartAndStats'

const TwoOutcomes = ({ prediction }: { prediction: Prediction }) => {
  const { isVisible: isVisibleFromState } = useDisappear({
    status: prediction.status,
    locked_at: prediction.locked_at || undefined,
  })

  return (
    <section className="flex size-full flex-col justify-between gap-1 px-1.5 py-1">
      <AnimatePresence>
        {isVisibleFromState && (
          <AnimatedDiv>
            <AnimatePresence mode="wait">
              {prediction.status !== 'resolved' ? (
                <AnimatedDiv key="timer">
                  <HeaderAndTimer prediction={prediction} />
                </AnimatedDiv>
              ) : (
                <AnimatedDiv key="summary">
                  <SummaryPanel
                    prediction={prediction}
                    animations={{
                      finalHeight: 100,
                      names: {
                        initialOffset: 80,
                        finalOffset: -150,
                      },
                    }}
                  />
                </AnimatedDiv>
              )}
            </AnimatePresence>
          </AnimatedDiv>
        )}
      </AnimatePresence>

      <ChartAndStats
        prediction={prediction}
        isVisibleFromState={isVisibleFromState}
      />
    </section>
  )
}

const AnimatedDiv = (props: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      {...props}
      className="h-full"
    >
      {props.children}
    </motion.div>
  )
}

export default TwoOutcomes
