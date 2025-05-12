import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Prediction } from '@/types/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberToReadableString = (number: number): string => {
  if (number === 0) return '-'

  const absNumber = Math.abs(number)

  let formatted: string
  if (absNumber >= 1_000_000) {
    formatted =
      (absNumber / 1_000_000).toFixed(absNumber % 1_000_000 === 0 ? 0 : 2) + 'M'
  } else if (absNumber >= 1_000) {
    formatted =
      (absNumber / 1_000).toFixed(absNumber % 1_000 === 0 ? 0 : 2) + 'k'
  } else {
    formatted = absNumber.toString()
  }

  return number < 0 ? `-${formatted}` : formatted
}

export const formatNumberWithSpaces = (
  num: number,
  separator: string = ' '
): string => {
  if (num === 0) return '-'

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export const formatSeconds = (seconds: number): string => {
  if (seconds <= 0) return '00:00'

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  const paddedMinutes = String(minutes).padStart(2, '0')
  const paddedSeconds = String(secs).padStart(2, '0')

  return `${paddedMinutes}:${paddedSeconds}`
}

export const calculateMultiplier = (points: number, total: number) =>
  points > 0 ? `${(total / points).toFixed(2)}x` : '-'

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export const calculateSecondsFromDate = (fromDate: string, seconds: number) => {
  const dateTime = new Date(fromDate).getTime()
  const now = Date.now()
  const diffMs = dateTime + seconds * 1000 - now
  return Math.max(Math.ceil(diffMs / 1000), 0)
}

export const getStatusText = (
  status: Prediction['status'],
  secondsLeft: number
) => {
  switch (status) {
    case 'ACTIVE':
      return `${formatSeconds(secondsLeft)}`
    case 'LOCKED':
      return 'Locked'
    case 'RESOLVED':
      return 'Resolved'
    case 'CANCELED':
      return 'Refunded'
    default:
      return 'Unknown'
  }
}
