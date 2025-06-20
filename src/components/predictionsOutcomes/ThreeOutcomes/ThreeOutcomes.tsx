import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Prediction } from '@/types/types'
import useDisappear from '@/hooks/useDissapear'

import ChartAndStats from './ChartAndStats'
import HeaderAndTimer from './HeaderAndTimer'
import SummaryPanel from './SummaryPanel'

const ThreeOutcomes = ({ prediction }: { prediction: Prediction }) => {
  const disappearStatus =
    prediction.status || (prediction.locked_at ? 'locked' : undefined)

  const { isVisible: isVisibleFromState } = useDisappear({
    status: disappearStatus,
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
                  <SummaryPanel prediction={prediction} />
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

export default ThreeOutcomes
