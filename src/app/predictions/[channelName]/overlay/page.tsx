'use client'

import { useEffect, useState } from 'react'

import { Prediction } from '@/types/types'
import Overlays from '@/components/Overlays'

const OverlayPage = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  //TODO: When active refetch data every XX seconds
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data).event
      setPrediction(data)
    }

    return () => {
      ws.close()
    }
  }, [])

  return <Overlays prediction={prediction} />
}

export default OverlayPage
