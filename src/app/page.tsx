import Link from 'next/link'
import { getServerSession } from 'next-auth'

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

        <Link
          href="/dev"
          className="rounded bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-900"
        >
          Developer Panel
        </Link>
      </div>
    </main>
  )
}

export default Home
