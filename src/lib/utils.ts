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
      (absNumber / 1_000_000).toFixed(absNumber % 1_000_000 === 0 ? 0 : 1) + 'M'
  } else if (absNumber >= 1_000) {
    formatted =
      (absNumber / 1_000).toFixed(absNumber % 1_000 === 0 ? 0 : 1) + 'k'
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

export const getSecondsLeft = (
  locks_at?: string,
  locked_at?: string
): number => {
  const now = new Date()

  if (locked_at) {
    const lockedAt = new Date(locked_at)
    if (now >= lockedAt) {
      return -1
    }
  }

  if (locks_at) {
    const locksAt = new Date(locks_at)
    const secondsLeft = Math.floor((locksAt.getTime() - now.getTime()) / 1000)
    return secondsLeft
  }

  return -1
}

export const getStatusText = (
  status: Prediction['status'] | 'locked',
  secondsLeft: number
) => {
  switch (status) {
    case 'resolved':
      return 'Resolved'
    case 'canceled':
      return 'Refunded'
    case 'locked':
      return 'Locked'
    default:
      return secondsLeft > 0 ? `${formatSeconds(secondsLeft)}` : 'Locked'
  }
}
