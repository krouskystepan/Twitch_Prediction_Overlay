'use client'

import { useState } from 'react'
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
import Overlays from '@/components/predictionsOutcomes/Overlays'

const DevPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [time, setTime] = useState(30)

  const {
    prediction,
    createPrediction,
    cancelPrediction,
    lockPrediction,
    resolvePrediction,
    resetPrediction,
  } = useMockPrediction()

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
  ]

  return (
    <section className="flex flex-col gap-4 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">🧪 Mock Predictions Panel</h1>
        <p className="text-xl font-semibold">
          This is mock data for development only, so the values might not always
          make sense.
        </p>
      </div>

      <div className="space-y-2">
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

      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Data Actions Buttons</h2>
          <div className="flex flex-wrap gap-2">
            {dataActions.map(({ label, fce, variant }) => (
              <Button
                variant={variant as any}
                key={label}
                onClick={() => {
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
                  <SelectItem value="5">5s</SelectItem>
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

        <div className="relative h-40 w-md overflow-hidden border border-black">
          <Overlays prediction={prediction} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Current Mock Prediction</h2>
        <p className="text-gray-500">
          Error:{' '}
          {error ? (
            <span className="font-semibold text-red-500">{error}</span>
          ) : (
            <span className="font-semibold text-green-500">No Errors</span>
          )}
        </p>
        <pre className="overflow-x-auto rounded-lg bg-gray-200 p-4 text-gray-800">
          {prediction
            ? JSON.stringify(prediction, null, 2)
            : 'No prediction available'}
        </pre>
      </div>
    </section>
  )
}

export default DevPage
