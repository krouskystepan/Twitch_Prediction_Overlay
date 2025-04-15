'use client'

import { useEffect, useState } from 'react'

import { Prediction } from '@/types/types'
import Overlays from '@/components/predictionsOutcomes/Overlays'
import TwoOutcomes from '@/components/predictionsOutcomes/TwoOutcomes'

const OverlayPage = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setPrediction(data)
    }

    return () => {
      ws.close()
    }
  }, [])

  return <Overlays prediction={prediction} />
}

export default OverlayPage
