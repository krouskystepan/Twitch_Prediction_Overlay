'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'

const DevPage = () => {
  const [prediction, setPrediction] = useState<string>('No predictions yet')
  const [error, setError] = useState('')

  const outcomes = [2, 3, 4, 5, 6, 7, 8, 9, 10]

  const dataActions = [
    {
      label: 'Lock Prediction',
      endpoint: 'api/mock-predictions/lock',
      method: 'POST',
      customClassName: 'bg-neutral-300 hover:bg-neutral-400',
    },
    {
      label: 'Cancel Prediction',
      endpoint: 'api/mock-predictions/cancel',
      method: 'POST',
      customClassName: 'bg-red-200 hover:bg-red-300',
    },
    {
      label: 'Resolve Prediction',
      endpoint: 'api/mock-predictions/resolve',
      method: 'POST',
      customClassName: 'bg-green-200 hover:bg-green-300',
    },
  ]

  const loadPrediction = async () => {
    try {
      const res = await axios.get('/api/mock-predictions')
      setPrediction(JSON.stringify(res.data, null, 2))
      setError('')
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        setError(e.response.data.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  useEffect(() => {
    loadPrediction()
  }, [])

  return (
    <section className="p-8 flex flex-col gap-4">
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
            <button
              key={num}
              onClick={async () => {
                try {
                  await axios.post('/api/mock-predictions/create', {
                    outcomeCount: num,
                  })
                  loadPrediction()
                } catch (e) {
                  if (axios.isAxiosError(e) && e.response?.data?.message) {
                    setError(e.response.data.message)
                  } else {
                    setError('An unknown error occurred')
                  }
                }
              }}
              className="cursor-pointer border px-4 py-2 rounded-lg bg-purple-300 duration-200 transition-colors hover:bg-purple-400"
            >
              Mock {num} outcome{num > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Data Actions Buttons</h2>
        <div className="flex flex-wrap gap-2">
          {dataActions.map(({ label, endpoint, method, customClassName }) => (
            <button
              key={label}
              onClick={async () => {
                try {
                  await axios(endpoint, { method })
                  loadPrediction()
                } catch (error) {
                  if (
                    axios.isAxiosError(error) &&
                    error.response?.data?.message
                  ) {
                    setError(error.response.data.message)
                  } else {
                    setError('An unknown error occurred')
                  }
                }
              }}
              className={`cursor-pointer border px-4 py-2 rounded-lg duration-200 transition-colors ${customClassName}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Dev Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={loadPrediction}
            className="cursor-pointer border px-4 py-2 rounded-lg duration-200 transition-colors bg-blue-200 hover:bg-blue-400"
          >
            🔄 Force Reload Prediction
          </button>
          <button
            onClick={async () => {
              try {
                await axios.delete('/api/mock-predictions/reset')
                setPrediction('No predictions yet')
              } catch (error) {
                if (
                  axios.isAxiosError(error) &&
                  error.response?.data?.message
                ) {
                  setError(error.response.data.message)
                } else {
                  setError('An unknown error occurred')
                }
              }
            }}
            className="cursor-pointer border px-4 py-2 rounded-lg duration-200 transition-colors bg-yellow-200 hover:bg-yellow-400"
          >
            ❌ Reset Predictions
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Current Mock Prediction</h2>
        <p className="text-gray-500">
          Error:{' '}
          {error ? (
            <span className="text-red-500 font-semibold">{error}</span>
          ) : (
            <span className="text-green-500 font-semibold">No Errors</span>
          )}
        </p>
        <pre className="overflow-x-auto bg-gray-200 p-4 rounded-lg text-gray-800 ">
          {prediction}
        </pre>
      </div>
    </section>
  )
}

export default DevPage
