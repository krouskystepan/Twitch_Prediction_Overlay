import Link from 'next/link'

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Twitch Predictions Overlay</h1>

      <div className="flex gap-4">
        <Link
          href="/api/auth/login"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login with Twitch
        </Link>

        <Link
          href="/dev"
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
        >
          Developer Panel
        </Link>
      </div>
    </main>
  )
}

export default Home
