import Link from 'next/link'

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Twitch Predictions Overlay</h1>

      <div className="flex gap-4">
        <Link
          href="/api/auth/login"
          className="rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700"
        >
          Login with Twitch
        </Link>

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
