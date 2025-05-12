'use client'

import { useEffect, useState } from 'react'

import { Prediction } from '@/types/types'

const timesToDisappear: { status: Prediction['status']; time: number }[] = [
  { status: 'CANCELED', time: 5_000 },
  { status: 'LOCKED', time: 2_000 },
  { status: 'RESOLVED', time: 14_000 },
]

const useDisappear = ({ status }: { status: Prediction['status'] }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    const config = timesToDisappear.find((s) => s.status === status)

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
  }, [status])

  return {
    isVisible,
  }
}

export default useDisappear
