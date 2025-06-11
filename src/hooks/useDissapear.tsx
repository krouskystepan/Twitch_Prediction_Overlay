'use client'

import { useEffect, useState } from 'react'

import { Prediction } from '@/types/types'

type DisappearStatus = Prediction['status'] | 'locked'

const timesToDisappear: { status: DisappearStatus; time: number }[] = [
  { status: 'canceled', time: 5_000 },
  { status: 'locked', time: 3_000 },
  // { status: 'resolved', time: 15_000 },
]

const useDisappear = ({ status }: { status: DisappearStatus }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    const config = status
      ? timesToDisappear.find((s) => s.status === status)
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
  }, [status])

  return {
    isVisible,
  }
}

export default useDisappear
