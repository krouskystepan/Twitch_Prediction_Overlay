import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Hourglass } from 'lucide-react'

import { Prediction } from '@/types/types'
import { getSecondsLeft, getStatusText } from '@/lib/utils'

const HeaderAndTimer = ({ prediction }: { prediction: Prediction }) => {
  const [initialTotalSeconds] = useState(() =>
    getSecondsLeft(prediction.locks_at, prediction.locked_at)
  )

  const startTimeRef = useRef(Date.now())
  const endTimeRef = useRef(Date.now() + initialTotalSeconds * 1000)

  const [percentage, setPercentage] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(initialTotalSeconds)

  useEffect(() => {
    if (!!prediction.locked_at || prediction.status) {
      setPercentage(100)
      return
    }

    let frameId: number

    const update = () => {
      const now = Date.now()
      const total = endTimeRef.current - startTimeRef.current
      const elapsed = now - startTimeRef.current
      const clamped = Math.min(elapsed / total, 1)

      setPercentage(clamped * 100)

      const newSecondsLeft = Math.ceil((endTimeRef.current - now) / 1000)
      setSecondsLeft(newSecondsLeft > 0 ? newSecondsLeft : 0)

      if (clamped < 1) {
        frameId = requestAnimationFrame(update)
      }
    }

    frameId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frameId)
  }, [prediction.locked_at, prediction.status])

  return (
    <>
      <div className="bg-overlay-bar rounded-tr-md px-1 pt-0.5">
        <h4 className="text-overlay-primary truncate text-xl leading-none font-bold">
          {prediction.title}
        </h4>
      </div>

      <Timer
        status={!!prediction.locked_at ? 'locked' : prediction.status}
        secondsLeft={secondsLeft}
        percentage={percentage}
      />
    </>
  )
}

const Timer = ({
  status,
  secondsLeft,
  percentage,
}: {
  status: Prediction['status'] | 'locked'
  secondsLeft: number
  percentage: number
}) => {
  return (
    <div className="relative w-full">
      {/* Design - Right Top rounded border for the timer bar */}
      <div className="custom-clip bg-overlay-bar absolute top-0 right-0 size-2" />

      <div className="border-overlay-bar z-20 flex h-6 overflow-hidden rounded-r-md rounded-bl-md border-2">
        <div className="bg-overlay-bar flex size-5 items-center justify-center p-1">
          <Hourglass
            className="transition-colors duration-100"
            color={
              secondsLeft <= 0 || status
                ? 'var(--ovr-disabled)'
                : 'var(--ovr-timer)'
            }
          />
        </div>

        <div
          className={`flex h-5 w-15 items-center justify-center transition-colors duration-100 ${
            secondsLeft <= 0 || status
              ? 'bg-overlay-disabled'
              : 'bg-overlay-timer'
          }`}
        >
          <p className="text-overlay-bar mx-1 text-xs font-bold tracking-tighter">
            {getStatusText(status, secondsLeft)}
          </p>
        </div>

        <div className="relative size-full overflow-hidden">
          <motion.div
            className={`h-full w-full overflow-hidden transition-colors ${
              secondsLeft <= 0 || status
                ? 'bg-overlay-disabled'
                : 'bg-overlay-timer'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  )
}

export default HeaderAndTimer
