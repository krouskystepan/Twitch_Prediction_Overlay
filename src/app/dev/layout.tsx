import { ReactNode } from 'react'
import { MockPredictionProvider } from '@/contexts/MockPredictionContext'

const DevLayout = ({ children }: { children: ReactNode }) => {
  return <MockPredictionProvider>{children}</MockPredictionProvider>
}

export default DevLayout
