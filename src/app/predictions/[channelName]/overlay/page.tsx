'use client'

import { useEffect, useState } from 'react'
import { Prediction } from '@/constants/types'
import axios from 'axios'

const OverlayPage = () => {
  const [prediction, setPrediction] = useState<Prediction | undefined>()

  ///////////////////////////////////////////////////////////////////////
  // This code is only for development purposes for creating the prediction states
  const loadPrediction = async () => {
    const res = await axios.get('/api/mock-predictions')
    setPrediction(res.data)
  }

  useEffect(() => {
    loadPrediction()
  }, [])
  ///////////////////////////////////////////////////////////////////////

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

  switch (prediction?.outcomes.length) {
    case 2:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Two Outcomes</h2>
        </div>
      )
    case 3:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Three Outcomes</h2>
        </div>
      )
    case 4:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Four Outcomes</h2>
        </div>
      )
    case 5:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Five Outcomes</h2>
        </div>
      )
    case 6:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Six Outcomes</h2>
        </div>
      )
    case 7:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Seven Outcomes</h2>
        </div>
      )
    case 8:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Eight Outcomes</h2>
        </div>
      )
    case 9:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Nine Outcomes</h2>
        </div>
      )
    case 10:
      return (
        <div className="min-h-dvh bg-neutral-600 text-white">
          <h1>OverlayPage</h1>
          <h2>Ten Outcomes</h2>
        </div>
      )
    default:
      return null
  }
}

export default OverlayPage
