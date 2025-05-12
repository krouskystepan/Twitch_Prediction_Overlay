import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

import {
  formatNumberToReadableString,
  formatNumberWithSpaces,
} from '@/lib/utils'
import ChannelPoints from '@/components/customIcons/ChannelPoints'

import { getCorrectTextColor } from './utils'

const ResolvedStats = ({
  totalPoints,
  totalUsers,
  outcomeOneId,
  outcomeTwoId,
  winningOutcomeId,
}: {
  totalPoints: number
  totalUsers: number
  outcomeOneId: string
  outcomeTwoId: string
  winningOutcomeId: string
}) => {
  return (
    <motion.div
      className="absolute top-3 left-1/2 line-clamp-1 flex w-fit -translate-x-1/2 flex-col items-center justify-center text-xl font-semibold"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.2,
        ease: 'linear',
      }}
    >
      <Stats
        text={formatNumberToReadableString(totalPoints)}
        iconLeft={
          <ChannelPoints
            className={getCorrectTextColor({
              isLeft: true,
              outcomeId: outcomeOneId,
              winningOutcomeId,
            })}
            size={14}
          />
        }
        iconRight={
          <ChannelPoints
            className={getCorrectTextColor({
              isLeft: false,
              outcomeId: outcomeTwoId,
              winningOutcomeId,
            })}
            size={14}
          />
        }
      />

      <Stats
        text={formatNumberWithSpaces(totalUsers)}
        iconLeft={
          <Users
            className={getCorrectTextColor({
              isLeft: true,
              outcomeId: outcomeOneId,
              winningOutcomeId,
            })}
            size={12}
          />
        }
        iconRight={
          <Users
            className={getCorrectTextColor({
              isLeft: false,
              outcomeId: outcomeTwoId,
              winningOutcomeId,
            })}
            size={12}
          />
        }
      />
    </motion.div>
  )
}

const Stats = ({
  text,
  iconLeft,
  iconRight,
}: {
  text: string
  iconLeft: ReactNode
  iconRight: ReactNode
}) => {
  return (
    <p className="flex w-full items-center justify-between gap-2 text-sm font-semibold">
      {iconLeft}
      {text}
      {iconRight}
    </p>
  )
}

export default ResolvedStats
