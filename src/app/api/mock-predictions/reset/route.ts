import { NextRequest, NextResponse } from 'next/server'
import { resetMockPrediction } from '@/services/mockPredictionsStore'
import { logMock } from '@/utils/logger'

export async function DELETE(req: NextRequest) {
  resetMockPrediction()

  logMock('Mock prediction reset')
  return NextResponse.json({ message: 'Mock prediction reset' })
}
