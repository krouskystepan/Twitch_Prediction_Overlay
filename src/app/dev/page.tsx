'use client'

import { useEffect, useRef, useState } from 'react'
import { useMockPrediction } from '@/contexts/MockPredictionContext'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Overlays from '@/components/Overlays'

const DevPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [time, setTime] = useState(30)
  const counter = useRef(1)
  const {
    prediction,
    createPrediction,
    updatePrediction,
    cancelPrediction,
    lockPrediction,
    resolvePrediction,
    resetPrediction,
  } = useMockPrediction()

  const [buttonsDisabled, setButtonsDisabled] = useState(false)
  const [bgColor, setBgColor] = useState('#000')

  useEffect(() => {
    if (!prediction?.started_at) return
    if (prediction?.locked_at || prediction.ended_at) return

    const lockedAt = prediction.locks_at
      ? new Date(prediction.locks_at).getTime()
      : prediction.locked_at
        ? new Date(prediction.locked_at).getTime()
        : 0

    const interval = setInterval(() => {
      const now = Date.now()

      if (now >= lockedAt) {
        clearInterval(interval)
        lockPrediction()
        return
      }

      updatePrediction(counter.current)
      counter.current += 1
    }, 5_000)

    return () => clearInterval(interval)
  }, [
    prediction?.started_at,
    prediction?.locked_at,
    prediction?.locks_at,
    prediction?.ended_at,
    counter,
    updatePrediction,
    lockPrediction,
  ])

  const outcomes = [2, 3, 4, 5, 6, 7, 8, 9, 10]

  const dataActions = [
    {
      label: 'Lock Prediction',
      fce: lockPrediction,
      variant: 'default',
    },
    {
      label: 'Cancel Prediction',
      fce: cancelPrediction,
      variant: 'destructive',
    },
    {
      label: 'Resolve Prediction',
      fce: resolvePrediction,
      variant: 'success',
    },
  ] as const

  const backgroundButtons = [
    {
      label: 'White',
      value: '#fff',
    },
    {
      label: 'Black',
      value: '#000',
    },
    {
      label: 'Red',
      value: '#f00',
    },
    {
      label: 'Green',
      value: '#0f0',
    },
    {
      label: 'Blue',
      value: '#00f',
    },
    {
      label: 'Yellow',
      value: '#ff0',
    },
  ]

  return (
    <section className="flex flex-col gap-4 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">🧪 Mock Predictions Panel</h1>
        <p className="text-xl font-semibold">
          This is mock data for development and testing only, so the values
          might not always make sense.
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-2 rounded-lg bg-neutral-800 p-4">
        <h2 className="text-2xl font-bold">Data Mock Buttons</h2>
        <div className="flex flex-wrap gap-2">
          {outcomes.map((num) => (
            <Button
              variant={'outline'}
              key={num}
              onClick={async () => {
                try {
                  createPrediction(num, time)
                  setError(null)

                  setButtonsDisabled(true)
                  setTimeout(() => setButtonsDisabled(false), 1000)
                } catch (e) {
                  console.log(e)
                  if (e instanceof Error) {
                    setError(e.message)
                  } else {
                    setError('An unknown error occurred')
                  }
                }
              }}
            >
              Mock {num} outcome{num > 1 ? 's' : ''}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex flex-col items-start gap-2 rounded-lg bg-neutral-800 p-4">
          <h2 className="text-2xl font-bold">Data Actions Buttons</h2>
          <div className="flex flex-wrap gap-2">
            {dataActions.map(({ label, fce, variant }) => (
              <Button
                variant={variant}
                key={label}
                disabled={buttonsDisabled}
                onClick={() => {
                  if (buttonsDisabled) return

                  try {
                    fce()
                    setError(null)
                  } catch (error) {
                    if (error instanceof Error) {
                      setError(error.message)
                    } else {
                      setError('An unknown error occurred')
                    }
                  }

                  setButtonsDisabled(true)
                  setTimeout(() => setButtonsDisabled(false), 1000)
                }}
              >
                {label}
              </Button>
            ))}
          </div>

          <h2 className="text-2xl font-bold">Dev Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                try {
                  resetPrediction()
                  setError(null)
                } catch (e) {
                  if (e instanceof Error) {
                    setError(e.message)
                  } else {
                    setError('An unknown error occurred')
                  }
                }
              }}
              className="bg-amber-300 text-black hover:bg-amber-300/90"
            >
              ❌ Reset Predictions
            </Button>
            <Select
              defaultValue="30"
              onValueChange={(value) => setTime(Number(value))}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Time" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Dev Values</SelectLabel>
                  <SelectItem value="10">10s</SelectItem>
                  <SelectItem value="20">20s</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Actual Values</SelectLabel>
                  <SelectItem value="30">30s</SelectItem>
                  <SelectItem value="60">1m</SelectItem>
                  <SelectItem value="120">2m</SelectItem>
                  <SelectItem value="300">5m</SelectItem>
                  <SelectItem value="600">10m</SelectItem>
                  <SelectItem value="900">15m</SelectItem>
                  <SelectItem value="1200">20m</SelectItem>
                  <SelectItem value="1800">30m</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-lg bg-neutral-800 p-4 sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Background Color</h2>
            <div className="grid grid-cols-2 gap-2">
              {backgroundButtons.map(({ label, value }) => (
                <Button
                  key={value}
                  variant="outline"
                  style={{ border: `1px solid ${value}` }}
                  onClick={() => setBgColor(value)}
                  className="capitalize"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          <div
            className={`relative h-40 w-md overflow-hidden border border-black transition-colors duration-500`}
            style={{ backgroundColor: bgColor }}
          >
            <Overlays prediction={prediction} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Current Mock Prediction</h2>
        <p className="text-gray-200">
          Error:{' '}
          {error ? (
            <span className="font-semibold text-red-500">{error}</span>
          ) : (
            <span className="font-semibold text-green-500">No Errors</span>
          )}
        </p>
        <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-neutral-200">
          {prediction
            ? JSON.stringify(prediction, null, 2)
            : 'No prediction available'}
        </pre>
      </div>
    </section>
  )
}

export default DevPage
