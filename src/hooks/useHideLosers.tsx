import { useEffect, useState } from 'react'

import { Prediction } from '@/types/types'

const useHideLosers = ({ status }: { status: Prediction['status'] }) => {
  const [hideLosers, setHideLosers] = useState(false)

  useEffect(() => {
    if (status === 'resolved') {
      const timeout = setTimeout(() => {
        setHideLosers(true)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [status])

  return hideLosers
}

export default useHideLosers
