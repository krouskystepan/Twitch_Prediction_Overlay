import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { Button } from '@/components/ui/button'
import AuthButtons from '@/components/AuthButtons'

import { authOptions } from './api/auth/[...nextauth]/route'

const Home = async () => {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Twitch Predictions Overlay</h1>
      <h2 className="text-xl font-semibold">
        Hello, {session?.user?.name ?? 'Guest'}!
      </h2>
      <div className="flex gap-4">
        <AuthButtons session={session} />

        <Link href="/dev">
          <Button
            variant="default"
            size="lg"
            className="py-4 text-base font-semibold"
          >
            Developer Panel
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default Home
