'use client'

import { useEffect, useState } from 'react'

import { Prediction } from '@/types/types'

type DisappearStatus = Prediction['status'] | 'locked'

const timesToDisappear: { status: DisappearStatus; time: number }[] = [
  { status: 'canceled', time: 5_000 },
  { status: 'locked', time: 3_000 },
  { status: 'resolved', time: 15_000 },
]

const useDisappear = ({
  status,
  locked_at,
}: {
  status: DisappearStatus
  locked_at: string | undefined
}) => {
  const disappearStatus = status || (locked_at ? 'locked' : undefined)

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    const config = disappearStatus
      ? timesToDisappear.find((s) => s.status === disappearStatus)
      : null

    if (config) {
      setIsVisible(true)
      timeout = setTimeout(() => {
        setIsVisible(false)
      }, config.time)
    } else {
      setIsVisible(true)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [disappearStatus])

  return {
    isVisible,
  }
}

export default useDisappear
