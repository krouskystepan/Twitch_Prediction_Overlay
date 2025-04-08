'use client'

import { Prediction } from '@/constants/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OverlayPage = () => {
  const [prediction, setPrediction] = useState<Prediction | undefined>()

  // This code is only for development purposes for creating the prediction states
  // useEffect(() => {
  //   setInterval(async () => {
  //     const res = await axios.get('/api/mock-predictions')
  //     setPrediction(res.data)
  //     // Refetch everty 5 seconds
  //   }, 5000)
  // }, [])

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
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Two Outcomes</h2>
        </div>
      )
    case 3:
      return (
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Three Outcomes</h2>
        </div>
      )
    case 4:
      return (
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Four Outcomes</h2>
        </div>
      )
    case 5:
      return (
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Five Outcomes</h2>
        </div>
      )
    case 6:
      return (
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Six Outcomes</h2>
        </div>
      )
    case 7:
      return (
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Seven Outcomes</h2>
        </div>
      )
    case 8:
      return (
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Eight Outcomes</h2>
        </div>
      )
    case 9:
      return (
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Nine Outcomes</h2>
        </div>
      )
    case 10:
      return (
        <div className="bg-neutral-600 text-white min-h-dvh">
          <h1>OverlayPage</h1>
          <h2>Ten Outcomes</h2>
        </div>
      )
    default:
      return null
  }
}

export default OverlayPage
