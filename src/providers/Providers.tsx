'use client'

import { MockPredictionProvider } from '@/contexts/MockPredictionContext'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode
  session?: Session | null
}) => {
  return (
    <SessionProvider session={session}>
      <MockPredictionProvider>{children}</MockPredictionProvider>
    </SessionProvider>
  )
}

export default Providers
