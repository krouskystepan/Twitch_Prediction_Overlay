import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { Prediction } from '@/types/types'
import { calculateSecondsFromDate, getStatusText } from '@/lib/utils'

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
      if (status !== 'ACTIVE') {
        setTimer({
          secondsLeft: 0,
          percent: 100,
        })
        clearInterval(interval)
        return
      }

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
            rotate: status === 'ACTIVE' ? 0 : status === 'LOCKED' ? 0.1 : -180,
          }}
          transition={{
            rotate: {
              duration:
                status === 'ACTIVE'
                  ? prediction_window
                  : status === 'LOCKED'
                    ? 0.5
                    : 0.2,
              ease: 'linear',
            },
            opacity: { duration: 0.6 },
          }}
        />
      ) : null}
    </section>
  )
}

export default Timer
