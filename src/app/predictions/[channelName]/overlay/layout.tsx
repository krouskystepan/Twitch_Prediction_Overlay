import { startEventSubSession } from '@/services/twitchSocket'
import { initWebSocketServer } from '@/services/websocketServer'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/authOptions'

const OverlayLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <main className="min-h-dvh">
        <div className="relative inset-4 h-40 w-md overflow-hidden">
          <h1 className="text-2xl text-black">You need to be logged in</h1>
        </div>
      </main>
    )
  }

  // TODO: Grab this from DB
  startEventSubSession(
    session?.user.accessToken as string,
    session?.user.twitchId as string
  )
  initWebSocketServer()

  return (
    <main className="min-h-dvh">
      <div className="relative inset-4 h-40 w-md overflow-hidden">
        {children}
      </div>
    </main>
  )
}

export default OverlayLayout
